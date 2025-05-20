import { GoogleGenAI } from "@google/generative-ai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function main(
  prompt: string,
  options: { temperature?: number; maxTokens?: number } = {}
) {
  const config = {
    responseMimeType: "text/plain",
    temperature: options.temperature || 0.7,
    maxOutputTokens: options.maxTokens || 1000,
  };

  const model = "gemini-2.5-pro-preview-05-06";
  const contents = [{ role: "user", parts: [{ text: prompt }] }];

  try {
    const stream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let finalText = "";
    for await (const chunk of stream) {
      finalText += chunk.text;
    }

    return finalText;
  } catch (error) {
    console.error("Error generating AI content:", error);
    throw new Error("Failed to generate AI response");
  }
}
