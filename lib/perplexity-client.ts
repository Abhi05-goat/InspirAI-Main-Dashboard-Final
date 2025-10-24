// Perplexity API Integration
// TODO: Add PERPLEXITY_API_KEY to your Vercel environment variables
// Get your API key from https://www.perplexity.ai/

// Example: Fetch market trends using Perplexity
export async function fetchMarketTrends(topic: string) {
  try {
    const response = await fetch("/api/perplexity/trends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    })

    if (!response.ok) throw new Error("Failed to fetch trends")
    return await response.json()
  } catch (error) {
    console.error("Error fetching trends:", error)
    return null
  }
}

// Example: Analyze competitors using Perplexity
export async function analyzeCompetitors(idea: string) {
  try {
    const response = await fetch("/api/perplexity/competitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    })

    if (!response.ok) throw new Error("Failed to analyze competitors")
    return await response.json()
  } catch (error) {
    console.error("Error analyzing competitors:", error)
    return null
  }
}
