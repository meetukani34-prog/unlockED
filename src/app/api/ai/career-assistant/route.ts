import { NextResponse } from "next/server";
import { analyzeCareerGuidance } from "@/lib/ai/career-assistant";
import { checkAiRateLimit } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local-client";
    const { allowed } = checkAiRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "AI rate limit reached. Please wait a minute before sending another request." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { interests, background, skills } = body;

    const guidance = await analyzeCareerGuidance({
      interests: interests || "Cloud architecture and microservices",
      background: background || "Operations and logistics background",
      skills: Array.isArray(skills) ? skills : ["Go", "Docker", "PostgreSQL"],
    });

    return NextResponse.json({ data: guidance });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate AI career guidance" },
      { status: 500 }
    );
  }
}
