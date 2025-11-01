"use client"

import { useState } from "react"
import { IdeaRecord } from "@/lib/supabase-client"

interface ExportButtonProps {
  data: IdeaRecord
}

export default function ExportButton({ data }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)


  const exportAsJSON = () => {
    const exportData = {
      project_name: data.Groq_PS_output?.title || "Untitled Project",
      original_idea: data.raw_idea,
      refined_idea: data.Groq_PS_output?.refined_idea,
      problem_statement: data.Groq_PS_output?.problem_statement,
      proposed_solution: data.Groq_PS_output?.proposed_solution,
      confidence_score: data.confidence,
      confidence_reason: data.Groq_PS_output?.confidence_reason,
      motivation: data.motivation,
      trends: data.Perplexity_trend_output?.trends || [],
      competitors: data.Perplexity_trend_output?.analysis || {},
      niches: data.Perplexity_trend_output?.niche_identification || [],
      citations: data.search_citations || [],
      created_at: data.created_at
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportData.project_name.replace(/[^a-zA-Z0-9]/g, '_')}_analysis.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

  }



  return (
    <button
      onClick={exportAsJSON}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      📋 Export as JSON
    </button>
  )
}