import { lovingFoodResponses } from "./constants.js";

export const getCurrentDate = () => {
  const currentDateInSingapore = new Date('2023-11-19T15:30:45').toLocaleString('en-US', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const isoString = new Date(currentDateInSingapore).toISOString().slice(0, 10) + 'T00:00:00.000Z';

  return isoString
};

export const get7DaysAgoDate = () => {
  const todaysDate = getCurrentDate()
  const inputDate = new Date(todaysDate);
  const oneWeekLater = new Date(inputDate);
  oneWeekLater.setDate(inputDate.getDate() - 7);

  return oneWeekLater.toISOString().slice(0, 10) + 'T00:00:00.000Z';
}

export const extractKeywords = (inputString) => {
  const betweenAteAndFor = inputString.match(/ate(.*?)for/);
  const lastWord = inputString.split(' ').pop();
  const extractedParts = [];

  if (betweenAteAndFor && betweenAteAndFor.length >= 2) {
    extractedParts.push(betweenAteAndFor[1].trim());
  }
  extractedParts.push(lastWord.charAt(0).toUpperCase() + lastWord.slice(1));
  return extractedParts;
};

export const getRandomLovingResponse = () => {
  const randomIndex = Math.floor(Math.random() * lovingFoodResponses.length);
  return lovingFoodResponses[randomIndex];
}
