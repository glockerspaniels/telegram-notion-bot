import { getOpenAIResponse } from "../api/openAI-routes.js";
import { getCurrentDate, extractKeywords } from "../helpers.js";
import { TELEGRAM_USERNAME_TO_NAME } from "../mapper.js";
import { createFoodItem } from "../prisma/prisma-routes.js";
import logger from "../utils/logger.js";

export const logFoodItemService = async (message, username) => {
  const keywords = extractKeywords(message);
  const foodName = keywords[0];
  const mealTime = keywords[1];

  if (foodName === undefined || mealTime === undefined) {
    logger.error(`Invalid food name or meal time.`)  
    return "Something Went Wrong. Did not log to prisma."
  }

  // Log to Prisma
  createFoodItem(getCurrentDate(), mealTime, foodName, TELEGRAM_USERNAME_TO_NAME[username])

  let responseMessage = '';
  if (TELEGRAM_USERNAME_TO_NAME[username] === 'Tatiana') {
    const response = await getOpenAIResponse(foodName)
    responseMessage += response
  } else {
    responseMessage += `K . Tks .`;
  }

  return responseMessage
}
