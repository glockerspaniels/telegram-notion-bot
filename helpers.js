export const formatDateWithSingaporeTimeZone = () => {
  const date = new Date();
  const offsetMinutes = -480; // UTC+8 offset in minutes
  const offsetMilliseconds = offsetMinutes * 60 * 1000;
  const singaporeTime = new Date(date.getTime() + offsetMilliseconds);
  return singaporeTime.toISOString();
};

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