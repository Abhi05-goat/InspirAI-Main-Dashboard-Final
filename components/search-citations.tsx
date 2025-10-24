"use client"

import { useState } from "react"

interface SearchCitationsProps {
  citations: string[]
}

export default function SearchCitations({ citations }: SearchCitationsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Research Sources</h2>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 mb-4 flex items-center justify-between bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all"
      >
        <span className="font-semibold text-blue-900">{citations.length} Research Sources</span>
        <span className="text-blue-600 text-xl font-bold">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="space-y-3">
          {citations.map((citation, index) => (
            <a
              key={index}
              href={citation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 bg-white border-2 border-blue-100 rounded-lg hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-600 group-hover:bg-blue-200">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-blue-600 group-hover:text-blue-800 group-hover:underline break-all font-medium">
                  {citation}
                </p>
              </div>
              <div className="text-blue-400 group-hover:text-blue-600 flex-shrink-0">→</div>
            </a>
          ))}
        </div>
      )}

      {/* TODO: Add citation filtering, export to bibliography, and source verification */}
    </div>
  )
}
