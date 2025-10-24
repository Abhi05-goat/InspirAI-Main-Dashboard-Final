interface MotivationCalloutProps {
  motivation: string
}

export default function MotivationCallout({ motivation }: MotivationCalloutProps) {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
      <div className="flex items-start gap-4">
        <div className="text-3xl">💡</div>
        <div>
          <p className="text-lg font-semibold text-blue-900 mb-2">Your Motivation</p>
          <p className="text-gray-700 italic text-base leading-relaxed">"{motivation}"</p>
        </div>
      </div>
    </div>
  )
}
