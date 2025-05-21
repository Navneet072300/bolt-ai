import { GoogleGenAI } from "@google/genai";

export async function main(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
  });

  const model = "gemini-2.0-flash";
  const config = {
    responseMimeType: "text/plain",
  };

  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const result = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return text;
}
