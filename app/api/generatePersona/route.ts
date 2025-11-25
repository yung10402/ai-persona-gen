import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



type GeneratePersonaBody = {
  ageRange?: string;
  gender?: string;
  occupation?: string;
  serviceSummary?: string;
  userGoal?: string;
};

type ItemWithSource = {
  text: string;
  source: string;
};

export async function POST(req: Request) {
  try {
    const {
      ageRange = "",
      gender = "",
      occupation = "",
      serviceSummary = "",
      userGoal = "",
    } = (await req.json()) as GeneratePersonaBody;

    const prompt = `
You are an AI persona generator for UX research.
Using the following inputs, create ONE realistic product user persona.

- Age range: ${ageRange || "unknown"}
- Gender: ${gender || "unknown"}
- Occupation: ${occupation || "unknown"}
- Service summary: ${serviceSummary || "unknown"}
- User Character: ${userGoal || "unknown"}

Return ONLY a valid JSON object with EXACTLY this shape (no explanation, no markdown):

{
  "persona": {
    "name": "a realistic Korean full name written in Hangul (e.g., \\"김민준\\")",
    "summary": "A 4-5 sentence synthesis capturing this persona’s motivations, context, digital literacy level, and product-relevant behaviors."
  },
  "behavior": [
    "Write exactly 7 behavior statements that describe observable, product-relevant behavioral patterns.",
    "Focus on task flows, decision criteria, daily routines, technology habits, information-seeking patterns, collaboration habits, and constraints.",
    "Avoid generic personality traits.",
    "Each item must be 1 sentence."
  ],
  "needs": [
    "Write exactly 7 needs or goals grounded in motivations, context of use, workflow problems, expectations, mental models, and desired outcomes.",
    "Ensure each need reflects actionable UX insights (not generic wishes).",
    "Each item must be 1 sentence."
  ],
  "pain": [
    "Write exactly 7 pain points reflecting friction, inefficiencies, emotional frustrations, cognitive load, unmet needs, breakdown points, and environmental constraints.",
    "Avoid vague statements. Focus on specific breakdowns within the product/service workflow.",
    "Each item must be 1 sentence."
  ],
  "scenario":  "A detailed, realistic 15 sentence narrative describing how this persona would engage with the product/service in a specific context, including motivation, trigger, behavior flow, decision points, and an outcome."
}

All field values MUST be written in natural English, even though the Korean name is in Hangul.
Do not include any additional fields.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message?.content ?? "{}";
    const parsed = JSON.parse(content);

    const result = {
      ...parsed,
      meta: {
        ageRange,
        gender,
        occupation,
        serviceSummary,
      },
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Persona API Error:", err);
    return NextResponse.json(
      { error: "Failed to generate persona" },
      { status: 500 },
    );
  }
}
