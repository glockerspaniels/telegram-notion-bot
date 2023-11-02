import { notion } from './notion-config.js';
import { formatDateWithSingaporeTimeZone } from "../helpers.js";
import logger from "../utils/logger.js";

const databaseId = "1f3bc223cdc24c9faeb814f2c70700ab";

export const newFoodLogEntry = async (notionUserId, foodName, mealTime) => {
  await notion.pages.create({
    "parent": {
      type: "database_id",
      "database_id": databaseId
    },
    "properties": {
      "Type": {
        "select": {
          "name": mealTime
        }
      },
      "Date": {
        "date": {
          "start": formatDateWithSingaporeTimeZone(),
          "end": null,
          "time_zone": "Asia/Singapore"
        }
      },
      "Person": {
        "people": [{
          "id": notionUserId,
        }]
      },
      "Name": {
        "title": [{
          "text": {
            "content": foodName
          }
        }]
      }
    }
  });

  logger.info("Successfully logged food to notion.");
}