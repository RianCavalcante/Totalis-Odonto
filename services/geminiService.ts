import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image using the 'gemini-2.5-flash-image' model (Nano Banana).
 * Falls back to a placeholder if API key is missing or generation fails.
 */
export const generateImage = async (prompt: string): Promise<string | null> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not set. Using placeholder.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `${prompt}. High quality, professional photography, photorealistic, cinematic lighting.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9", // Default generic aspect ratio
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    
    return null;
  } catch (error: any) {
    // Gracefully handle quota exhaustion (429)
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      console.warn("Gemini API Quota Exceeded. Using fallback images.");
      return null;
    }
    console.error("Error generating image:", error);
    return null;
  }
};