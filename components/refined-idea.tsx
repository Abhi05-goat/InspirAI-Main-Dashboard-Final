interface RefinedIdeaProps {
  refinedData: {
    title: string
    summary: string
  }
}

export default function RefinedIdea({ refinedData }: RefinedIdeaProps) {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-400 transition-all">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
          2
        </span>
        Refined Idea
      </h2>
      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <p className="text-gray-700 leading-relaxed italic">
          <span className="text-blue-600 font-semibold">"</span>
          {refinedData.summary}
          <span className="text-blue-600 font-semibold">"</span>
        </p>
      </div>
      <h3 className="text-lg font-semibold text-blue-700 mb-3">{refinedData.title}</h3>
      {/* TODO: Add version history or comparison view */}
    </div>
  )
}
