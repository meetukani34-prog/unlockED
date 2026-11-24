import { NextResponse } from "next/server";
import { improveResumeContent } from "@/lib/ai/resume-assistant";
import { checkAiRateLimit } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local-client";
    const { allowed } = checkAiRateLimit(ip);
    if (!allowed) {
      return NextResponse.json({ error: "AI rate limit reached." }, { status: 429 });
    }

    const body = await req.json();
    const { targetRole, textToImprove, type } = body;

    const improvement = await improveResumeContent({
      targetRole: targetRole || "Software Engineer",
      textToImprove: textToImprove || "",
      type: type || "bullet_point",
    });

    return NextResponse.json({ data: improvement });
  } catch {
    return NextResponse.json({ error: "Failed to improve resume" }, { status: 500 });
  }
}
