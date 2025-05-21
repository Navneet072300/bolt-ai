import { main } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const rawResult = await main(prompt);

    let plainText = rawResult;
    try {
      const parsed = JSON.parse(rawResult);
      if (parsed.result) plainText = parsed.result;
    } catch {
      // If parsing fails, just keep rawResult as is
    }

    // Return plain text directly, not wrapped in JSON
    return new NextResponse(plainText, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error in AI response:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
