interface ProblemSolutionProps {
  problemSolution: {
    problem_statement: string
    proposed_solution: string
  }
}

export default function ProblemSolution({ problemSolution }: ProblemSolutionProps) {
  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <div className="bg-white border-2 border-red-200 rounded-xl p-6 hover:shadow-lg hover:border-red-300 transition-all">
        <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm">⚠️</span>
          Problem Statement
        </h2>
        <p className="text-gray-700 leading-relaxed">{problemSolution.problem_statement}</p>
      </div>

      {/* Proposed Solution */}
      <div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all">
        <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">✓</span>
          Proposed Solution
        </h2>
        <p className="text-gray-700 leading-relaxed">{problemSolution.proposed_solution}</p>
      </div>
    </div>
  )
}
