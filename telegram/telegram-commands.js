import { extractKeywords, getRandomLovingResponse } from "../helpers.js";
import { TELEGRAM_USERNAME_TO_NAME, TELEGRAM_USERNAME_TO_NOTION_ID } from "../mapper.js";
import { newFoodLogEntry } from "../notion/notion-routes.js";
import { bot } from "./telegram-config.js";
import logger from "../utils/logger.js";

// Log food item to Notion
export const onLogCommand = () => {
  bot.onText(/\/log/, (message) => {
    const { message_id: originalMessageId, from: { username }, chat: { id: chatId } } = message;
  
    if (message.text.split(' ').length < 2) {
      logger.error(`Invalid Input Error. Got: ${message.text}`)

      bot.sendMessage(chatId, `Invalid Input Error.`, 
        {reply_to_message_id: originalMessageId}
      );

      return
    }

    const notionUserId = TELEGRAM_USERNAME_TO_NOTION_ID[username];
    const keywords = extractKeywords(message.text);
    const foodName = keywords[0];
    const mealTime = keywords[1];
  
    if (foodName === undefined) {
      logger.error(`Invalid food name. Got ${foodName}`)
      return
    }
  
    if (mealTime === undefined) {
      logger.error(`Invalid meal time. Got ${mealTime}`)
      return
    }

    newFoodLogEntry(notionUserId, foodName, mealTime);

    let responseMessage = '';
    if (TELEGRAM_USERNAME_TO_NAME[username] === 'Tatiana') {
      responseMessage += `Nice Yana! Logged your food intake: ${foodName} for ${mealTime}. \n`;
      responseMessage += getRandomLovingResponse();
    } else {
      responseMessage += `K . Tks .`;
    }
  
    bot.sendMessage(chatId, responseMessage, {
      reply_to_message_id: originalMessageId
    })
  });
};
