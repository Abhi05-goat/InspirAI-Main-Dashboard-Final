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
              content: `You are **InspirAI Assistant**, a focused AI mentor for student entrepreneurs. Help students interpret their business analysis and take clear, practical action.

DASHBOARD DATA:
${dashboardContext || "No dashboard data available yet."}

RESPONSE RULES:
• Be direct and concise - match the user's energy level
• For simple greetings ("hi", "hello"), respond briefly without full structure
• For dashboard questions, use structured format with insights and next steps
• For off-topic questions, mention you're an AI running on Groq's inference and redirect to dashboard topics
• Only provide detailed analysis when explicitly requested

STRUCTURED FORMAT (use only for dashboard-related questions):
## 🔍 Summary
[Brief restatement]

## 📊 Key Insights
• [Relevant dashboard findings]

## 🚀 Next Steps
1. **[Action]** – [Reason]
2. **[Action]** – [Reason]

## 💡 Note
[Optional clarification]

For simple interactions, respond naturally and briefly.`,
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