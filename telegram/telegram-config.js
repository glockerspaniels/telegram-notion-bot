import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const telegramToken = process.env.TELEGROM_BOT_KEY;
export const bot = new TelegramBot(telegramToken, { polling: true });
