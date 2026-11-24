import { NextResponse } from "next/server";
import { generateInterviewQuestions, evaluateInterviewAnswer } from "@/lib/ai/mock-interview";
import { checkAiRateLimit } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local-client";
    const { allowed } = checkAiRateLimit(ip);
    if (!allowed) {
      return NextResponse.json({ error: "AI rate limit reached." }, { status: 429 });
    }

    const body = await req.json();
    const { action, targetRole, question, expectedConcepts, candidateAnswer } = body;

    if (action === "evaluate") {
      const evaluation = await evaluateInterviewAnswer({
        targetRole: targetRole || "Associate Cloud Infrastructure SRE",
        question: question || "Explain goroutine scheduling in Go.",
        expectedConcepts: expectedConcepts || ["pprof", "channel concurrency"],
        candidateAnswer: candidateAnswer || "",
      });
      return NextResponse.json({ data: evaluation });
    }

    const questions = await generateInterviewQuestions({
      targetRole: targetRole || "Associate Cloud Infrastructure SRE",
      experienceLevel: "entry",
      count: 3,
    });
    return NextResponse.json({ data: questions });
  } catch {
    return NextResponse.json({ error: "Failed to process interview" }, { status: 500 });
  }
}
