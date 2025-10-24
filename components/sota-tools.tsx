interface SOTAToolsProps {
  tools: Array<{
    tool_name: string
    snippet: {
      definition: string
      sota_aspect: string
      working_one_liner: string
      example_workflow: string
    }
  }>
}

export default function SOTATools({ tools }: SOTAToolsProps) {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">State-of-the-Art Tools</h2>

      <div className="space-y-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white border-2 border-blue-100 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{tool.tool_name}</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase">Definition</p>
                <p className="text-sm text-gray-700">{tool.snippet.definition}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase">SOTA Aspect</p>
                <p className="text-sm text-gray-700">{tool.snippet.sota_aspect}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase">How It Works</p>
                <p className="text-sm text-gray-700">{tool.snippet.working_one_liner}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TODO: Add tool comparison, integration guides, and implementation examples */}
    </div>
  )
}
