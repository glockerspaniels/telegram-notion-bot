import { getCurrentDate, get7DaysAgoDate } from "../helpers.js";
import { TELEGRAM_USERNAME_TO_NAME } from "../mapper.js";
import { getFoodItems } from "../prisma/prisma-routes.js";
import logger from "../utils/logger.js";
import { getWeeklyFoodSummary } from "../message-responses/weeklyFoodResponse.js";

export const getWeeklyFoodService = async (username) => {
  // Get From to Prisma
  const user = TELEGRAM_USERNAME_TO_NAME[username];
  const userList = [user]
  if (user === 'Tatiana') {
    userList.push('Tatiana Tabrani')
  } else {
    userList.push('Jason A Kaharudin')
  }

  const startDate = getCurrentDate()
  const endDate = get7DaysAgoDate()

  logger.info("Received /weeklyfood command. Waiting for prisma...")
  const data = await getFoodItems(userList, startDate, endDate)
  logger.info("Received /weeklyfood command. Waiting for prisma...")

  const responseMessage = getWeeklyFoodSummary(data)

  return responseMessage
}
