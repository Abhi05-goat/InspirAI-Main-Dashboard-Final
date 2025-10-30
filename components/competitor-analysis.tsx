"use client"

import { useState } from "react"

interface CompetitorAnalysisProps {
  competitors: Record<
    string,
    {
      pros: string[]
      cons: string[]
      opportunity: string
    }
  >
  citations: string[]
}

export default function CompetitorAnalysis({ competitors, citations }: CompetitorAnalysisProps) {
  const [expandedCompetitor, setExpandedCompetitor] = useState<string | null>(null)

  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Competitor Analysis</h2>

      <div className="space-y-4">
        {Object.entries(competitors).map(([name, data]) => (
          <div
            key={name}
            className="bg-white border-2 border-blue-100 rounded-lg overflow-hidden hover:shadow-md hover:border-blue-300 transition-all"
          >
            <button
              onClick={() => setExpandedCompetitor(expandedCompetitor === name ? null : name)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-blue-900">{name}</h3>
              <span className="text-blue-600 text-xl font-bold">{expandedCompetitor === name ? "−" : "+"}</span>
            </button>

            {expandedCompetitor === name && (
              <div className="px-4 pb-4 border-t-2 border-blue-100 space-y-4 bg-blue-50">
                {/* Pros */}
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {data.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 mt-1 font-bold">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h4 className="text-sm font-semibold text-red-700 mb-2">Weaknesses</h4>
                  <ul className="space-y-1">
                    {data.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-600 font-bold">✕</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opportunity */}
                <div>
                  <h4 className="text-sm font-semibold text-blue-700 mb-2">Your Opportunity</h4>
                  <p className="text-sm text-gray-700">{data.opportunity}</p>
                </div>


              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sources */}
      {citations && citations.length > 0 && (
        <div className="mt-6 pt-4 border-t-2 border-blue-100">
          <h4 className="text-sm font-semibold text-blue-700 mb-2">Research Sources</h4>
          <div className="flex flex-wrap gap-2">
            {citations.slice(0, 3).map((citation, idx) => (
              <a
                key={idx}
                href={citation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-xs underline"
              >
                Source {idx + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* TODO: Add comparison matrix view, export analysis */}
    </div>
  )
}
