import { NextResponse } from "next/server";
import { INITIAL_ASSESSMENTS } from "@/lib/data/mock-data";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { assessmentId, answers, timeSpentSeconds } = body;

    const assessment = INITIAL_ASSESSMENTS.find((a) => a.id === assessmentId);
    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    // Calculate score strictly on the server
    let earnedPoints = 0;
    let totalPoints = 0;
    const breakdown: {
      questionId: string;
      isCorrect: boolean;
      correctOption: number;
      explanation: string;
    }[] = [];

    for (const q of assessment.questions) {
      totalPoints += q.points;
      const studentAnswer = answers[q.id];
      const isCorrect = studentAnswer === q.correct_answer;

      if (isCorrect) {
        earnedPoints += q.points;
      }

      breakdown.push({
        questionId: q.id,
        isCorrect,
        correctOption: q.correct_answer,
        explanation: q.explanation || "Verified by evaluation engine.",
      });
    }

    const percentage = Math.round((earnedPoints / Math.max(1, totalPoints)) * 100);
    const passed = percentage >= assessment.passing_score;

    return NextResponse.json({
      score: earnedPoints,
      totalPoints,
      percentage,
      passed,
      timeSpentSeconds,
      breakdown,
      verifiedHash: passed ? `7F84-AI-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : null,
      message: passed
        ? "Congratulations! You have passed the benchmark assessment."
        : "You did not achieve the passing score. Review the recommended modules and re-attempt.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to evaluate assessment submission" },
      { status: 500 }
    );
  }
}
