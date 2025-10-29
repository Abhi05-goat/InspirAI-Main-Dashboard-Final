interface TrendsSectionProps {
  trends: string[]
}

export default function TrendsSection({ trends }: TrendsSectionProps) {
  const safeTrends = trends || []
  
  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Market Trends</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safeTrends.map((trend, index) => (
          <div
            key={index}
            className="bg-white border-2 border-blue-100 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-600">
                {index + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TODO: Add trend filtering, sorting, and export options */}
    </div>
  )
}
