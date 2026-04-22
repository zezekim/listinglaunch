import Anthropic from "@anthropic-ai/sdk";
import { PAUL_SMITH_SYSTEM_PROMPT } from "@/lib/paulsmith-voice";
import { PropertyInput, GeneratedPackage } from "@/lib/types";

const client = new Anthropic();

export async function POST(request: Request) {
  const body: PropertyInput = await request.json();

  const propertyContext = `
Property Address: ${body.address}
Price: ${body.price}
Bedrooms: ${body.bedrooms} | Bathrooms: ${body.bathrooms} | Sqft: ${body.sqft}
Property Type: ${body.propertyType}
Key Highlights: ${body.highlights}
  `.trim();

  const userPrompt = `Generate a complete listing launch package for this property. Write everything in Paul Smith's voice as described.

${propertyContext}

Return ONLY a valid JSON object with exactly these keys (no markdown, no code blocks):
{
  "email": "Full HTML email body (use inline styles, professional layout, include property specs table, Paul's contact info 512.228.8074, Office@TwelveRiversRealty.com, and a clear CTA)",
  "instagram": "Instagram caption (max 150 words, hook first line, 3-5 relevant hashtags, conversational tone)",
  "linkedin": "LinkedIn post (max 200 words, professional tone, market insight angle, no hashtag spam — max 3)",
  "facebook": "Facebook post (max 180 words, community-focused, warm and inviting, 2-3 hashtags)",
  "pdfHeadline": "Bold 8-12 word headline for print flyer",
  "pdfDescription": "3-4 sentence property description for print flyer (evocative, Paul's voice)",
  "pdfSpecs": "Formatted specs string: e.g. '4 BD · 3 BA · 2,400 SF · $975,000'",
  "videoScript": "15-25 word punchy on-screen text for animated video — 4 short slides separated by | character (e.g. 'Now Available in South Austin | 4 Bed · 3 Bath · $975K | Pool. Views. Your next chapter. | Contact Paul Smith · 512.228.8074')"
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    system: PAUL_SMITH_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const rawText =
    message.content[0].type === "text" ? message.content[0].text : "";

  let parsed: GeneratedPackage;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    // Strip markdown code fences if model wrapped the JSON
    const match = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
    parsed = JSON.parse(match ? match[1] : rawText);
  }

  return Response.json(parsed);
}
