interface BusinessNichesProps {
  niches: string[]
}

export default function BusinessNiches({ niches }: BusinessNichesProps) {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Business Niches</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {niches.map((niche, index) => (
          <div
            key={index}
            className="bg-white border-2 border-blue-100 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 mb-3">
              {index + 1}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{niche}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
