// pages/api/ai-chat.ts or app/api/ai-chat/route.ts (whichever you're using)

import { main } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await main(prompt); // ✅ Pass prompt directly to main()
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in AI response:", error);
    return NextResponse.json({ error: (error as Error).message });
  }
}
