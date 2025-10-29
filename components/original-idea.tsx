interface OriginalIdeaProps {
  idea: string
}

export default function OriginalIdea({ idea }: OriginalIdeaProps) {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-400 transition-all">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
          1
        </span>
        Original Idea
      </h2>
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <p className="text-gray-800 leading-relaxed">{idea}</p>
      </div>
      {/* TODO: Add edit button to modify the original idea */}
    </div>
  )
}
