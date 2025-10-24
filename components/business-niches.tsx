"use client"

import { useState } from "react"
import VisualizationEditor from "./visualization-editor"

interface BusinessNichesProps {
  niches: string[]
}

export default function BusinessNiches({ niches }: BusinessNichesProps) {
  const [selectedNiche, setSelectedNiche] = useState<number | null>(null)

  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Business Niches</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {niches.map((niche, index) => (
          <div
            key={index}
            className="bg-white border-2 border-blue-100 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 mb-3">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{niche}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedNiche(selectedNiche === index ? null : index)}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transition-all text-sm font-semibold border-0"
            >
              {selectedNiche === index ? "Close Visualization" : "View/Edit Visualization"}
            </button>

            {selectedNiche === index && (
              <div className="mt-4 pt-4 border-t-2 border-blue-100">
                <VisualizationEditor niche={niche} index={index} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* TODO: Add niche comparison, market size estimates, implementation roadmaps */}
    </div>
  )
}
