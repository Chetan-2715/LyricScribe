
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { FileData } from "../types.ts";

const MODEL_NAME = 'gemini-flash-latest';

export const processHandwriting = async (fileData: FileData): Promise<string> => {
  // Use the standard pattern for initializing the API client
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = {
    inlineData: {
      mimeType: fileData.mimeType,
      data: fileData.base64,
    },
  };

  const textPart = {
    text: `This image contains Kannada song lyrics written in Marathi/Devanagari script. 
    First, extract the text exactly as written in the image (Devanagari). 
    Second, transliterate that text into the native Kannada script. 
    Return the output as a clean, clearly separated text block. 
    
    IMPORTANT: Focus on accurate transliteration of phonetic Kannada sounds from the Devanagari script.
    
    Format the response clearly:
    
    [ORIGINAL TEXT]
    (Extracted Devanagari text)
    
    [KANNADA TRANSLITERATION]
    (Transliterated Kannada text)`
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts: [imagePart, textPart] },
    });

    const text = response.text;
    if (!text) {
      throw new Error("The model did not return any text content.");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('403')) {
      throw new Error("Access denied. Please check your API key permissions.");
    }
    throw new Error(error.message || "An error occurred while processing the lyrics.");
  }
};
