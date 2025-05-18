/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { chatSession } from ""; 

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await chatSession.sendMessage(prompt);
    const AiResp = await result.response.text(); 

    return NextResponse.json({ result: AiResp });
  } catch (error) {
    console.error("Error in AI response:", error);
    return NextResponse.json({ error: (error as Error).message });
  }
}
