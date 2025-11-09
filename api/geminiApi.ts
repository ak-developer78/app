import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is handled, even if it's undefined in some environments
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: apiKey as string });

/**
 * Generates content using a standard Gemini model.
 * @param prompt The text prompt to send to the model.
 * @returns The generated text.
 */
export const generateContent = async (prompt: string): Promise<string> => {
  if (!apiKey) throw new Error("API key is not configured.");
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get response from Gemini.");
  }
};

/**
 * Generates content using Google Search grounding for up-to-date and factual information.
 * @param prompt The text prompt to send to the model.
 * @returns An object containing the generated text and an array of sources.
 */
export const generateWithSearchGrounding = async (prompt: string): Promise<{ text: string; sources: any[] }> => {
  if (!apiKey) throw new Error("API key is not configured.");
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    return {
      text: response.text,
      sources: groundingMetadata?.groundingChunks || [],
    };
  } catch (error) {
    console.error("Gemini API call with search grounding failed:", error);
    throw new Error("Failed to get grounded response from Gemini.");
  }
};

/**
 * Generates content using Google Maps grounding for location-based queries.
 * @param prompt The user's query.
 * @param latitude The user's current latitude.
 * @param longitude The user's current longitude.
 * @returns An object containing the generated text and an array of map-related sources.
 */
export const generateWithMapsGrounding = async (prompt: string, latitude: number, longitude: number): Promise<{ text: string; sources: any[] }> => {
  if (!apiKey) throw new Error("API key is not configured.");
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: { latitude, longitude },
          },
        },
      },
    });
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    return {
      text: response.text,
      sources: groundingMetadata?.groundingChunks || [],
    };
  } catch (error) {
    console.error("Gemini API call with maps grounding failed:", error);
    throw new Error("Failed to get grounded response from Gemini.");
  }
};
