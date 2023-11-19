import logger from "../utils/logger.js";

const generateMealSummary = (mealData) => {
  const summary = {
    totalMeals: 0,
    mealsByDate: {},
    snacksCount: 0,
    treatsCount: 0,
  };
  mealData.forEach((meal) => {
    // Count total meals
    summary.totalMeals++;

    // Organize meals by date
    const mealDate = meal.date.toISOString().slice(0, 10);
    if (!summary.mealsByDate[mealDate]) {
      summary.mealsByDate[mealDate] = [];
    }
    summary.mealsByDate[mealDate].push(meal);

    // Check for snacks and treats
    const mealTypeLowerCase = meal.mealType.toLowerCase();
    if (mealTypeLowerCase === 'snack') {
      summary.snacksCount++;
    } else if (mealTypeLowerCase === 'treat') {
      summary.treatsCount++;
    }
  });

  return summary;
};

export const getWeeklyFoodSummary = (mealData) => {
  const summary = generateMealSummary(mealData);

  let report = `Here's your meal summary:\n\n`;

  report += `Snacks Count: ${summary.snacksCount}\n`;
  report += `Treats Count: ${summary.treatsCount}\n\n`;

  report += `Total Meals: ${summary.totalMeals}\n\n`;

  // Display meals by date
  for (const date in summary.mealsByDate) {
    const dateObject = new Date(date);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateObject);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    report += `${dayOfWeek} ${formattedDate}\n`;
  
    const meals = summary.mealsByDate[date];
  
    meals.forEach((meal, index) => {
      report += `${index + 1}. ${meal.foodName} (${meal.mealType})\n\n`;
    });
  }

  return report;
}
