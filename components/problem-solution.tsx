interface ProblemSolutionProps {
  problemSolution: {
    problem_statement: string
    proposed_solution: string
  }
}

export default function ProblemSolution({ problemSolution }: ProblemSolutionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Problem Statement */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 hover:shadow-xl hover:border-red-400 hover:scale-105 transition-all duration-300 group">
        <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-lg group-hover:rotate-12 transition-transform">
            🚨
          </div>
          Problem Statement
        </h2>
        <div className="bg-white/70 rounded-lg p-4 border border-red-200">
          <p className="text-gray-800 leading-relaxed font-medium">{problemSolution.problem_statement}</p>
        </div>
      </div>

      {/* Proposed Solution */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 hover:shadow-xl hover:border-green-400 hover:scale-105 transition-all duration-300 group">
        <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-lg group-hover:rotate-12 transition-transform">
            💡
          </div>
          Proposed Solution
        </h2>
        <div className="bg-white/70 rounded-lg p-4 border border-green-200">
          <p className="text-gray-800 leading-relaxed font-medium">{problemSolution.proposed_solution}</p>
        </div>
      </div>
    </div>
  )
}
