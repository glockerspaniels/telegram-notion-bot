import { extractKeywords } from "../helpers.js";
import { TELEGRAM_USERNAME_TO_NAME, TELEGRAM_USERNAME_TO_NOTION_ID } from "../mapper.js";
import { newFoodLogEntry } from "../notion/notion-routes.js";
import { bot } from "./telegram-config.js";

// Log food item to Notion
export const onLogCommand = () => {
  bot.onText(/\/log/, (message) => {
    const { message_id: originalMessageId, from: { username }, chat: { id: chatId } } = message;
  
    const notionUserId = TELEGRAM_USERNAME_TO_NOTION_ID[username];
  
    const keywords = extractKeywords(message.text);
    const foodItem = keywords[0];
    const mealTime = keywords[1];
  
    newFoodLogEntry(notionUserId, foodItem, mealTime);
    let responseMessage = '';
    if (TELEGRAM_USERNAME_TO_NAME[username] === 'Tatiana') {
      responseMessage += `Noted Yana. Logged your food intake: ${foodItem} for ${mealTime}. You are doing great, yanapapaya_bot thinks you're doing a great job!`;
    } else {
      responseMessage += `K . Tks .`;
    }
  
    bot.sendMessage(chatId, responseMessage, {
      reply_to_message_id: originalMessageId
    })
  });
};
