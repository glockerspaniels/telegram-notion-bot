import { onLogCommand, onWeeklyfoodCommand } from "./telegram/telegram-commands.js";
import logger from "./utils/logger.js";

logger.info("Telegram bot Yanapapaya is now running...");

// Waiting for `/log I ate burgers for dinner` command.
onLogCommand();
onWeeklyfoodCommand();
