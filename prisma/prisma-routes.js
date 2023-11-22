import logger from "../utils/logger.js";
import { prismadb } from "../utils/prismadb.js";

export const createFoodItem = async (date, mealType, name, user) => {
  try {
    await prismadb.food_logger.create({
      data: {
        date: date,
        foodName: name,
        mealType: mealType,
        user: user
      }
    })

    logger.info('Successfully logged to prisma.')
  } catch(error) {
    logger.error('Error writing to prisma:', error)
    console.log(error)
  }
}

export const getFoodItems = async (userList, startDate, endDate) => {
  try {
    const foodItems = await prismadb.food_logger.findMany({
      where: {
        user: {
          in: userList
        },
        date: {
          gte: endDate,
          lte: startDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
    })
    return foodItems
  } catch (error) {
    logger.error("Something went wrong querying Prisma.", error)
    console.log(error)
  }
}