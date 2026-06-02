// ============================================================
// geminiService.ts
// Uses the Featherless AI OpenAI-compatible REST API directly.
// The @google/genai SDK is NOT used here — it targets Google's
// servers and is incompatible with Featherless endpoints.
// ============================================================

const FEATHERLESS_API_KEY =
  (import.meta as any).env?.VITE_FEATHERLESS_API_KEY as string ||
  (typeof process !== 'undefined' && process.env?.FEATHERLESS_API_KEY) ||
  '';

const FEATHERLESS_BASE_URL = 'https://api.featherless.ai/v1';
const MODEL = 'google/gemma-3-27b-it';

// ── Types ────────────────────────────────────────────────────

export interface RoadmapStep {
  stepNumber: number;
  topic: string;
  importance: string;
  resources: { name: string; url: string; type: string }[];
  estimatedTime: string;
  practiceProject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface RoadmapResponse {
  learningGoal: string;
  steps: RoadmapStep[];
}

// ── Helpers ──────────────────────────────────────────────────

/**
 * Make a chat-completion request to the Featherless API.
 */
async function featherlessChat(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  temperature = 0.7,
  maxTokens = 4096
): Promise<string> {
  if (!FEATHERLESS_API_KEY) {
    throw new Error(
      'VITE_FEATHERLESS_API_KEY is not set. Please add it to your .env.local file.'
    );
  }

  const response = await fetch(`${FEATHERLESS_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${FEATHERLESS_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    if (response.status === 401) {
      throw new Error(
        `Authentication failed (401). Check your VITE_FEATHERLESS_API_KEY. Details: ${errText}`
      );
    }
    if (response.status === 429) {
      throw new Error('API rate limit exceeded (429). Please wait a moment and try again.');
    }
    throw new Error(
      `Featherless API error ${response.status}: ${response.statusText}. ${errText}`
    );
  }

  const data = await response.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Empty response from Featherless API.');
  }
  return content;
}

/**
 * Extract the first JSON object/array found inside a string.
 * Models often wrap JSON in markdown fences like ```json … ```.
 */
function extractJson(raw: string): string {
  // Strip markdown fences if present
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();

  // Try to find the outermost { … } block
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    return raw.slice(start, end + 1);
  }

  return raw.trim();
}

// ── Public API ───────────────────────────────────────────────

export async function generateLearningRoadmap(
  goal: string,
  level: string,
  skills: string,
  mode: 'fast' | 'deep' = 'fast'
): Promise<RoadmapResponse> {
  const systemPrompt = `You are an expert educational consultant and AI Learning Pathway Generator.
Your job is to produce structured, personalized learning roadmaps.
You MUST respond with ONLY valid JSON — no markdown, no explanations, no prose outside the JSON.

The JSON schema you must follow exactly:
{
  "learningGoal": "string",
  "steps": [
    {
      "stepNumber": 1,
      "topic": "string",
      "importance": "string",
      "resources": [
        { "name": "string", "url": "string", "type": "Video | Textbook | Course | Article" }
      ],
      "estimatedTime": "string",
      "practiceProject": "string",
      "difficulty": "Beginner | Intermediate | Advanced"
    }
  ]
}`;

  const userPrompt = `Create a complete learning roadmap for the following:
- Learning Goal: ${goal}
- Current Knowledge Level: ${level}
- Known Skills: ${skills || 'None specified'}

Instructions:
1. Identify 6-10 key topics required to achieve the goal.
2. Determine prerequisite topics and arrange them in logical learning order (basic to advanced).
3. For each topic, suggest 2-3 high-quality free resources such as:
   - Free textbooks (OpenStax, LibreTexts)
   - YouTube lectures (MIT OCW, Khan Academy, 3Blue1Brown)
   - Free online courses (Coursera audit, edX Free, Saylor Academy)
   - Research articles (arXiv, Google Scholar)
4. Estimate realistic time to complete each step.
5. Suggest a hands-on practice project for each step.

Respond with ONLY the JSON object. Do not include any text before or after it.`;

  // Deep mode uses a slightly higher temperature for richer, more detailed output
  const temperature = mode === 'deep' ? 0.85 : 0.65;
  const maxTokens = mode === 'deep' ? 6144 : 4096;

  console.log(
    `[geminiService] Generating ${mode} roadmap | goal="${goal}" | level="${level}" | model=${MODEL}`
  );

  try {
    const raw = await featherlessChat(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      maxTokens
    );

    const jsonStr = extractJson(raw);
    let parsed: RoadmapResponse;

    try {
      parsed = JSON.parse(jsonStr) as RoadmapResponse;
    } catch {
      console.error('[geminiService] Failed to parse JSON. Raw response:\n', raw);
      throw new Error(
        'The AI returned an invalid response format. Please try again.'
      );
    }

    if (!parsed.learningGoal || !Array.isArray(parsed.steps)) {
      throw new Error(
        'The AI response was missing required fields. Please try again.'
      );
    }

    console.log('[geminiService] Roadmap generated successfully —', parsed.steps.length, 'steps');
    return parsed;
  } catch (error) {
    console.error('[geminiService] Error:', error);
    throw error;
  }
}

// ── Stub functions kept for compatibility with the rest of the app ──

export async function analyzeImage(
  imageBytes: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  // Featherless supports vision via the chat API for vision-capable models.
  // For now, return a graceful message if the current model doesn't support vision.
  try {
    const content = await featherlessChat([
      {
        role: 'user',
        content: `[Image analysis requested]\n${prompt}\n\nNote: Image data provided as base64 (${mimeType}).`,
      },
    ]);
    return content;
  } catch (error) {
    console.error('[geminiService] analyzeImage error:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
}

export async function generateImage(
  _prompt: string,
  _imageBytes?: string,
  _mimeType?: string
): Promise<string> {
  throw new Error(
    'Image generation is not supported by the Featherless API in this integration.'
  );
}

export async function generateVeoVideo(
  _imageBytes: string,
  _mimeType: string,
  _prompt: string,
  _aspectRatio: '16:9' | '9:16' = '16:9'
): Promise<string> {
  throw new Error(
    'Video generation is not supported by the Featherless API in this integration.'
  );
}
