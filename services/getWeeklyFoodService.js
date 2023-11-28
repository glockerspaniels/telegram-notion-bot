import mongoose from 'mongoose'
import { getCurrentDate, get7DaysAgoDate } from "../helpers.js";
import { TELEGRAM_USERNAME_TO_NAME } from "../mapper.js";
import { getWeeklyFoodSummary } from "../message-responses/weeklyFoodResponse.js";
import { connectDB } from '../utils/connectDB.js';
import FoodLogger from '../models/FoodLogger.js';
import { MAX_RETRIES } from '../constants.js';
import dotenv from "dotenv";

dotenv.config();

export const getWeeklyFoodService = async (username) => {
  const startDate = getCurrentDate()
  const endDate = get7DaysAgoDate()
  const user = TELEGRAM_USERNAME_TO_NAME[username];
  const userList = [user]
  if (user === 'Tatiana') {
    userList.push('Tatiana Tabrani')
  } else {
    userList.push('Jason A Kaharudin')
  }

  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      console.log(`try number: ${retries}`)
      await connectDB();
      const data = await FoodLogger.find({
        user: { $in: userList },
        date: { $lte: startDate, $gte: endDate }
      })
        .sort({ date: 'desc' })
        .exec()
      
      const responseMessage = getWeeklyFoodSummary(data)
      
      return responseMessage
    } catch (error) {
      retries++;
      console.error("Error:", error)

      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      return "Something went wrong with Mongo. Couldnt get summary"
    } finally {
      await mongoose.connection.close()
    }
  }
}
