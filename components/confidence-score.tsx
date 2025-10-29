interface ConfidenceScoreProps {
  confidence: number
  reason: string
}

function getConfidenceColor(score: number): string {
  if (score <= 3) return "bg-red-100 border-red-300 text-red-900"
  if (score <= 6) return "bg-yellow-100 border-yellow-300 text-yellow-900"
  return "bg-green-100 border-green-300 text-green-900"
}

function getConfidenceLabel(score: number): string {
  if (score <= 3) return "Low"
  if (score <= 6) return "Medium"
  return "High"
}

export default function ConfidenceScore({ confidence, reason }: ConfidenceScoreProps) {
  const colorClass = getConfidenceColor(confidence)
  const label = getConfidenceLabel(confidence)

  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Confidence Score</h2>

      <div className={`rounded-lg p-6 border-2 ${colorClass} mb-4 text-center`}>
        <div className="text-5xl font-bold mb-2">{confidence}/10</div>
        <div className="text-sm font-semibold">{label} Confidence</div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold text-blue-900">Why: </span>
          {reason}
        </p>
      </div>

      {/* TODO: Add confidence improvement suggestions */}
    </div>
  )
}
