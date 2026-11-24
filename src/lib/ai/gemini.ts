import { GoogleGenAI } from "@google/genai";
import { AI_RATE_LIMIT } from "@/lib/constants";

// Lazy-initialize GoogleGenAI client if API key exists
let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// In-memory rate limiting map (IP / User -> timestamp[])
const rateLimitMap = new Map<string, number[]>();

export function checkAiRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const timestamps = rateLimitMap.get(identifier) || [];

  // Filter timestamps within the current 1-minute window
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= AI_RATE_LIMIT.MAX_REQUESTS_PER_MINUTE) {
    rateLimitMap.set(identifier, recent);
    return { allowed: false, remaining: 0 };
  }

  recent.push(now);
  rateLimitMap.set(identifier, recent);
  return { allowed: true, remaining: AI_RATE_LIMIT.MAX_REQUESTS_PER_MINUTE - recent.length };
}

export function sanitizeAiInput(input: string, maxLength = AI_RATE_LIMIT.MAX_INPUT_LENGTH): string {
  if (!input) return "";
  // Strip null bytes and truncate safely
  return input.replace(/\0/g, "").slice(0, maxLength).trim();
}

/**
 * High-reliability generative call with fallback
 */
export async function generateAiContent({
  systemInstruction,
  prompt,
  model = "gemini-2.5-flash",
  responseMimeType,
}: {
  systemInstruction: string;
  prompt: string;
  model?: string;
  responseMimeType?: string;
}): Promise<string> {
  const client = getGeminiClient();

  if (!client) {
    throw new Error("NO_API_KEY");
  }

  try {
    const config: Record<string, unknown> = {
      systemInstruction,
      temperature: 0.3,
    };

    if (responseMimeType) {
      config.responseMimeType = responseMimeType;
    }

    const response = await client.models.generateContent({
      model,
      contents: prompt,
      config,
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI engine");
    }
    return text;
  } catch (err: unknown) {
    console.error("Gemini API Error:", err);
    throw err;
  }
}
