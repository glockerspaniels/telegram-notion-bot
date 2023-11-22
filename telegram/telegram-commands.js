import { bot } from "./telegram-config.js";
import logger from "../utils/logger.js";
import { createFoodItemService } from "../services/createFoodItemService.js";
import { getWeeklyFoodService } from "../services/getWeeklyFoodService.js";

export const onLogCommand = async () => {
  bot.onText(/\/log/, async (message) => {
    const { message_id: originalMessageId, from: { username }, chat: { id: chatId } } = message;
    
    if (message.text.split(' ').length < 2) {
      logger.error(`Invalid Input Error. Got: ${message.text}`)

      bot.sendMessage(chatId, `Invalid Input Error.`, 
        {reply_to_message_id: originalMessageId}
      );

      logger.error("Invalid user input.")
      return
    }

    const responseMessage = await createFoodItemService(message.text, username)

    bot.sendMessage(chatId, responseMessage, {
      reply_to_message_id: originalMessageId
    })
  });
};

export const onWeeklyfoodCommand = () => {
  bot.onText(/\/weeklyfood/, async (message) => {
    const { message_id: originalMessageId, from: { username }, chat: { id: chatId } } = message;
    console.log("got your request for weeklyfood")
    const responseMessage = await getWeeklyFoodService(username);
    

    bot.sendMessage(chatId, responseMessage, {
      reply_to_message_id: originalMessageId
    })
  });
}
