import { openai } from "./openAI-config.js";
import logger from "../utils/logger.js";

const instructionMesage = {
  role: "system",
  content: "You are a speaking to someone working on her diet. Give me a response that mentions the food in a supportive and loving manner."
}

async function getOpenAIResponse(userMessage, chatContext = instructionMesage) {
  const updatedContext = [
    chatContext,
    { role: 'user', content: userMessage },
  ];

  logger.info()

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: updatedContext,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    return 'An error occurred while processing your request.';
  }
}

export { getOpenAIResponse };