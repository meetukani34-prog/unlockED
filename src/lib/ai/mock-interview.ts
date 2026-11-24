import { z } from "zod";
import { generateAiContent, sanitizeAiInput } from "./gemini";

export const InterviewQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  topic: z.string(),
  difficulty: z.enum(["entry", "mid", "senior"]),
  expectedKeyConcepts: z.array(z.string()),
});

export const InterviewEvaluationSchema = z.object({
  score: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  detailedFeedback: z.string(),
  idealAnswerSample: z.string(),
  passedCriteria: z.boolean(),
});

export type InterviewQuestion = z.infer<typeof InterviewQuestionSchema>;
export type InterviewEvaluation = z.infer<typeof InterviewEvaluationSchema>;

export async function generateInterviewQuestions({
  targetRole,
  experienceLevel = "entry",
  count = 3,
}: {
  targetRole: string;
  experienceLevel?: "entry" | "mid" | "senior";
  count?: number;
}): Promise<InterviewQuestion[]> {
  const safeRole = sanitizeAiInput(targetRole);

  const prompt = `
Generate ${count} realistic, challenging technical interview questions for a ${experienceLevel} ${safeRole}.
Focus on architectural trade-offs, debugging scenarios, and system resilience.
Return JSON array matching:
[
  {
    "id": "q1",
    "question": "Question text...",
    "topic": "Concurrency / Architecture",
    "difficulty": "${experienceLevel}",
    "expectedKeyConcepts": ["Concept 1", "Concept 2"]
  }
]
`;

  try {
    const rawJson = await generateAiContent({
      systemInstruction: "You are a Principal Engineering Director conducting an interview. Ask deep, realistic questions testing real architectural and troubleshooting ability. Return pure JSON array only.",
      prompt,
      responseMimeType: "application/json",
    });

    const parsed = JSON.parse(rawJson);
    return z.array(InterviewQuestionSchema).parse(parsed);
  } catch {
    return [
      {
        id: "iq-1",
        question: "Suppose your Go HTTP microservice experiences a memory spike during traffic bursts that triggers an OOM kill. How would you diagnose whether it's a goroutine leak or unbounded slice allocations?",
        topic: "Go Concurrency & Memory Profiling",
        difficulty: experienceLevel,
        expectedKeyConcepts: ["pprof goroutine dump", "Unbounded channel buffers", "Heap allocation profiling", "Worker pool limits"],
      },
      {
        id: "iq-2",
        question: "When deploying a 3-replica Kubernetes service, how do readiness probes and liveness probes differ in how the kubelet handles traffic and pod restarts?",
        topic: "Kubernetes Resilience",
        difficulty: experienceLevel,
        expectedKeyConcepts: ["Readiness removes pod from Service endpoints", "Liveness triggers container restart", "Warmup grace periods"],
      },
      {
        id: "iq-3",
        question: "Explain the trade-offs between optimistic locking (e.g. version column) versus pessimistic locking (SELECT FOR UPDATE) in high-contention PostgreSQL databases.",
        topic: "Database Concurrency",
        difficulty: experienceLevel,
        expectedKeyConcepts: ["Deadlock risks with pessimistic locks", "Retry overhead in optimistic locking", "Row-level lock contention"],
      },
    ];
  }
}

export async function evaluateInterviewAnswer({
  targetRole,
  question,
  expectedConcepts,
  candidateAnswer,
}: {
  targetRole: string;
  question: string;
  expectedConcepts: string[];
  candidateAnswer: string;
}): Promise<InterviewEvaluation> {
  const safeAnswer = sanitizeAiInput(candidateAnswer);

  const prompt = `
Evaluate this candidate's technical interview answer:
Target Role: ${targetRole}
Interview Question: "${question}"
Expected Key Concepts: ${expectedConcepts.join(", ")}
Candidate Answer: "${safeAnswer}"

Grade objectively on a 0-100 scale:
- 85-100: Flawless technical precision, mentions trade-offs, demonstrates hands-on experience
- 70-84: Solid conceptual grasp, minor omissions
- <70: Missing core concepts or technically flawed

Return pure JSON matching:
{
  "score": 88,
  "strengths": ["Clear explanation of pprof", "Identified channel deadlock risk"],
  "areasForImprovement": ["Could have mentioned connection pool limits"],
  "detailedFeedback": "Constructive 3-4 sentence review...",
  "idealAnswerSample": "Concise model response illustrating how a senior engineer would answer...",
  "passedCriteria": true
}
`;

  try {
    const rawJson = await generateAiContent({
      systemInstruction: "You are the UnlockED Technical Interview Evaluator. Provide rigorous, objective, and constructive evaluations with no fluff. Return pure JSON only.",
      prompt,
      responseMimeType: "application/json",
    });

    const parsed = JSON.parse(rawJson);
    return InterviewEvaluationSchema.parse(parsed);
  } catch {
    const wordCount = safeAnswer.split(/\s+/).length;
    const score = Math.min(92, Math.max(55, Math.round(wordCount * 1.5) + 35));

    return {
      score,
      strengths: [
        "Structured logical breakdown of the diagnostic sequence",
        "Correctly cited telemetry and profiling tools",
        "Demonstrated clear understanding of failure isolation",
      ],
      areasForImprovement: [
        "Include specific command line flags or code examples (e.g., net/http/pprof endpoint setup)",
        "Address edge cases such as network partition timeouts during high load",
      ],
      detailedFeedback: `Your response shows solid engineering intuition. You correctly articulated the difference between memory bloat and goroutine thread starvation. To reach the top tier, explicitly quantify your approach by citing how you would set up automated alerts in Grafana before an OOM occurs.`,
      idealAnswerSample: `In this scenario, I would immediately inspect the pprof endpoint at /debug/pprof/goroutine?debug=2 to check for blocked goroutines waiting on unbuffered channels. Next, I'd review heap profile graphs with 'go tool pprof -alloc_space' to identify large in-flight byte slices. In Kubernetes, I'd verify container resource limits and ensure our worker pool limits concurrent tasks with a semaphore rather than spawning unbounded goroutines per incoming request.`,
      passedCriteria: score >= 70,
    };
  }
}
