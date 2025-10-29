"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"

export default function ProcessingPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [isReady, setIsReady] = useState(false)
  const [statusMessage, setStatusMessage] = useState('🤖 Processing your idea with AI...')
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    if (!email) return

    const startTime = Date.now()
    
    const updateStatus = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setTimeElapsed(elapsed)
      
      if (elapsed < 120) { // 0-2 minutes
        setStatusMessage('🤖 AI is analyzing your idea...')
        setIsReady(false)
      } else if (elapsed < 180) { // 2-3 minutes
        setStatusMessage('🔍 Finalizing market research...')
        setIsReady(false)
      } else { // 3+ minutes
        setStatusMessage('✅ Analysis Complete! Your dashboard is ready.')
        setIsReady(true)
      }
    }

    // Update immediately
    updateStatus()
    
    // Update every second
    const interval = setInterval(updateStatus, 1000)
    
    return () => clearInterval(interval)
  }, [email])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-8"></div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Analyzing Your Idea...
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-4 text-lg text-gray-600">
            <p>Our AI is processing your business idea with:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">🤖 Groq AI</h3>
                <p className="text-sm text-blue-700">Refining your idea and analyzing problem-solution fit</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900">🔍 Perplexity</h3>
                <p className="text-sm text-green-700">Researching market trends and competitors</p>
              </div>
            </div>
            
            <div className={`mt-8 p-4 border-l-4 rounded ${
              isReady 
                ? 'bg-green-50 border-green-400' 
                : 'bg-blue-50 border-blue-400'
            }`}>
              <p className={`mb-4 font-semibold ${
                isReady ? 'text-green-800' : 'text-blue-800'
              }`}>
                {statusMessage}
              </p>
              
              {!isReady && (
                <p className="text-blue-700 mb-4">
                  <strong>Expected completion:</strong> 2-3 minutes
                </p>
              )}
              
              <a 
                href={`/dashboard?email=${encodeURIComponent(email || '')}`}
                className={`inline-block px-6 py-3 rounded-lg transition-colors ${
                  isReady
                    ? 'bg-green-600 text-white hover:bg-green-700 animate-pulse'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isReady ? '✅ Open Dashboard (Ready!)' : '⏳ Dashboard (Processing...)'}
              </a>
              
              <p className={`text-sm mt-2 ${
                isReady ? 'text-green-600' : 'text-blue-600'
              }`}>
                {isReady 
                  ? 'Click above to view your complete analysis!' 
                  : 'This page will update automatically when ready.'
                }
              </p>
            </div>
            
            {email && (
              <p className="text-sm text-gray-500 mt-4">
                Analysis for: {email}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}