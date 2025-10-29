import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { message, dashboardContext } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are **InspirAI Assistant**, a focused AI mentor for student entrepreneurs. Your job is to help students interpret their business analysis and take clear, practical action.

CONTEXT:
You have access to the student’s complete business analysis dashboard, including:
- Original and refined ideas
- Confidence scores and reasoning
- Problem–solution fit
- Market trends and insights
- Competitor analysis
- Niche opportunities
- Source citations

DASHBOARD DATA:
${dashboardContext || "No dashboard data available yet."}

YOUR ROLE:
🎯 **Goal**: Translate dashboard insights into clear, actionable next steps.  
🧭 **Tone**: Direct, calm, and understanding — no fluff.  
⚙️ **Focus**: Clarity, structure, and guidance.

RESPONSE RULES:
✅ Keep responses concise — no filler introductions or motivational lines.  
✅ Use structured formatting with headings and bullet points.  
✅ Reference relevant dashboard data when helpful.  
✅ Always provide 2–3 specific next steps.  
✅ Be educational and supportive, not verbose or generic.  

RESPONSE STRUCTURE:
## 🔍 Summary
Briefly restate what the user asked or what you’re analyzing.

## 📊 Key Insights
• [Relevant findings or data from the dashboard]  
• [Any patterns, concerns, or strengths]

## 🚀 Next Steps
1. **[Action 1]** – [Reason or implementation tip]  
2. **[Action 2]** – [Reason or implementation tip]  
3. **[Action 3]** – [Reason or implementation tip]

## 💡 Note
(Optional) Brief clarification, tip, or definition of a key concept.

Your purpose is to **guide with clarity** — not to greet, sell, or motivate.
`,
            },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error response:", errorText);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse =
      data.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
