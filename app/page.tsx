"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import MotivationCallout from "@/components/motivation-callout"
import OriginalIdea from "@/components/original-idea"
import RefinedIdea from "@/components/refined-idea"
import ConfidenceScore from "@/components/confidence-score"
import ProblemSolution from "@/components/problem-solution"
import TrendsSection from "@/components/trends-section"
import CompetitorAnalysis from "@/components/competitor-analysis"
import BusinessNiches from "@/components/business-niches"
import ChatbotPanel from "@/components/chatbot-panel"
import SOTATools from "@/components/sota-tools"
import SearchCitations from "@/components/search-citations"
import { fetchDashboardDataFromAPI } from "@/lib/api-client"
import { IdeaRecord } from "@/lib/supabase-client"

export default function Dashboard() {
  const searchParams = useSearchParams()
  const [dashboardData, setDashboardData] = useState<IdeaRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content:
        "Hi! I'm your InspirAI assistant. I've analyzed your idea and I'm ready to help you refine it. What would you like to explore first?",
    },
  ])
  const mainContentRef = useRef<HTMLDivElement>(null)
  const [pageContext, setPageContext] = useState("")

  useEffect(() => {
    const email = searchParams.get('email') || 'asivaprakash23@gmail.com' // Default for testing
    
    async function loadDashboardData() {
      setLoading(true)
      setError(null)
      
      const data = await fetchDashboardDataFromAPI(email)
      
      if (data) {
        setDashboardData(data)
      } else {
        setError('Failed to load dashboard data')
      }
      
      setLoading(false)
    }
    
    loadDashboardData()
  }, [searchParams])

  useEffect(() => {
    if (mainContentRef.current) {
      const htmlContent = mainContentRef.current.innerHTML
      setPageContext(htmlContent)
    }
  }, [dashboardData])

  const handleChatMessage = (message: string) => {
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: message },
      {
        role: "assistant",
        content: "Great question! Based on your idea, here are some actionable next steps...",
      },
    ])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'No data found'}</p>
          <p className="text-gray-600">Please check the email parameter in the URL</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main ref={mainContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Motivation Callout */}
        <div className="mb-8">
          <MotivationCallout motivation={dashboardData.motivation} />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <OriginalIdea idea={dashboardData.raw_idea} />
            <RefinedIdea refinedData={dashboardData.Groq_PS_output} />
            <ProblemSolution problemSolution={dashboardData.Groq_PS_output} />
          </div>

          {/* Right Column - Confidence & Quick Stats */}
          <div className="space-y-6">
            <ConfidenceScore
              confidence={dashboardData.confidence}
              reason={dashboardData.Groq_PS_output.confidence_reason}
            />
          </div>
        </div>

        {/* Trends Section */}
        <div className="mb-8">
          <TrendsSection trends={dashboardData.Perplexity_trend_output.trends} />
        </div>

        {/* Competitor Analysis */}
        <div className="mb-8">
          <CompetitorAnalysis
            competitors={dashboardData.Perplexity_trend_output.analysis}
            citations={dashboardData.search_citations}
          />
        </div>

        {/* SOTA Tools Section */}
        <div className="mb-8">
          <SOTATools tools={[]} />
        </div>

        {/* Search Citations Section */}
        <div className="mb-8">
          <SearchCitations citations={dashboardData.search_citations} />
        </div>

        {/* Business Niches */}
        <div className="mb-8">
          <BusinessNiches niches={dashboardData.Perplexity_trend_output.niche_identification} />
        </div>
      </main>

      <ChatbotPanel messages={chatMessages} onSendMessage={handleChatMessage} pageContext={pageContext} />
    </div>
  )
}
