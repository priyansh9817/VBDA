// utils/openaiHelper.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateInvitation = async (guest, eventName) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(
      `Write a warm and friendly invitation for ${guest.name} to the event "${eventName}".`
    );

    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error('Gemini AI error:', err.message);
    return `Dear ${guest.name}, you're invited to "${eventName}"! We hope to see you there.`;
  }
};
