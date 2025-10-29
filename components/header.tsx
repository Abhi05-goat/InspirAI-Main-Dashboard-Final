export default function Header() {
  return (
    <header className="bg-white border-b border-blue-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-3xl">✨</div>
              <h1 className="text-4xl font-bold text-blue-900">InspirAI Dashboard</h1>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              <span className="italic">"Refine your ideas with AI-powered insights"</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* TODO: Add user profile, settings, export buttons here */}
            <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transition-all text-sm font-semibold">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
