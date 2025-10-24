// Groq API Integration
// TODO: Add GROQ_API_KEY to your Vercel environment variables
// Get your API key from https://console.groq.com

// Example: Generate refined idea using Groq
export async function generateRefinedIdea(rawIdea: string) {
  try {
    const response = await fetch("/api/groq/refine-idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawIdea }),
    })

    if (!response.ok) throw new Error("Failed to generate refined idea")
    return await response.json()
  } catch (error) {
    console.error("Error generating refined idea:", error)
    return null
  }
}

// Example: Generate problem statement using Groq
export async function generateProblemStatement(idea: string) {
  try {
    const response = await fetch("/api/groq/problem-statement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    })

    if (!response.ok) throw new Error("Failed to generate problem statement")
    return await response.json()
  } catch (error) {
    console.error("Error generating problem statement:", error)
    return null
  }
}
