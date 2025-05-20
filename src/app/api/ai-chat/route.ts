import { main } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await main(prompt); // This now returns full response
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in AI response:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
