import { onLogCommand } from "./telegram/telegram-commands.js";

console.log("Telegram bot Yanapapaya is now running...");

// Waiting for `/log I ate burgers for dinner` command.
onLogCommand();
