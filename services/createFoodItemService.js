import mongoose from 'mongoose'
import { connectDB } from "../utils/connectDB.js";
import FoodLogger from "../models/FoodLogger.js";
import { getOpenAIResponse } from "../api/openAI-routes.js";
import { TELEGRAM_USERNAME_TO_NAME } from "../mapper.js";
import { getCurrentDate, extractKeywords } from "../helpers.js";
import { MAX_RETRIES } from '../constants.js';

export const createFoodItemService = async (message, username) => {
  const keywords = extractKeywords(message);
  const foodName = keywords[0];
  const mealType = keywords[1];

  if (foodName === undefined || mealType === undefined) {
    console.error(`Invalid food name or meal time.`)  
    return "Something Went Wrong. Did not log."
  }
  
  const newFoodLog = {
    date: getCurrentDate(),
    foodName: foodName,
    mealType: mealType,
    user: TELEGRAM_USERNAME_TO_NAME[username]
  }

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      await connectDB();
      await FoodLogger.create(newFoodLog)
      console.log("Logged to Mongo.")
  
      let responseMessage = '';
      if (TELEGRAM_USERNAME_TO_NAME[username] === 'Tatiana') {
        const response = await getOpenAIResponse(foodName)
        responseMessage += response
      } else {
        responseMessage += `K . Tks .`;
      }
    
      return responseMessage
    } catch(error) {
      retries++;
      console.error('Error:', error)
      
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      return "Something went wrong with Mongo. Did not log."
    } finally {
      await mongoose.connection.close()
    }
  }
}
