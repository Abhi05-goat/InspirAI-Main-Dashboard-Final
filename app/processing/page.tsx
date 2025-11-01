"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import { fetchDashboardDataFromAPI } from "@/lib/api-client"

export default function ProcessingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email')
  const projectId = searchParams.get('project')
  const [isReady, setIsReady] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)
  const [statusMessage, setStatusMessage] = useState('🤖 Processing your idea with AI...')
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Check if the most recent row for this email is complete
  const isAnalysisComplete = (data: any) => {
    if (!data) {
      console.log('No data found')
      return false
    }
    
    console.log('Checking completion for row:', data.id)
    console.log('Created at:', data.created_at)
    console.log('Groq_PS_output:', !!data.Groq_PS_output)
    console.log('Perplexity_trend_output:', !!data.Perplexity_trend_output)
    console.log('Perplexity trends:', data.Perplexity_trend_output?.trends?.length || 0)
    
    // Check for completion
    const hasGroqData = data.Groq_PS_output && data.Groq_PS_raw
    const hasPerplexityData = data.Perplexity_trend_output && data.Perplexity_trend_output_raw
    const hasTrends = data.Perplexity_trend_output?.trends && 
      (Array.isArray(data.Perplexity_trend_output.trends) ? data.Perplexity_trend_output.trends.length > 0 : 
       Object.keys(data.Perplexity_trend_output.trends).length > 0)
    
    console.log('Has Groq:', hasGroqData)
    console.log('Has Perplexity:', hasPerplexityData) 
    console.log('Has Trends:', hasTrends)
    
    return hasGroqData && hasPerplexityData && hasTrends
  }

  useEffect(() => {
    if (!email) return

    const startTime = Date.now()
    const processingStartTime = new Date().toISOString() // When processing page loaded
    let pollInterval: NodeJS.Timeout
    let newestProjectId: string | null = null
    
    const checkCompletion = async () => {
      try {
        // Get newest project ID
        const response = await fetch(`/api/projects?email=${encodeURIComponent(email)}`)
        const projectsData = await response.json()
        
        if (projectsData.projects && projectsData.projects.length > 0) {
          // Only check projects created after processing started (new submissions)
          const newProjects = projectsData.projects.filter((project: any) => {
            return new Date(project.created_at) >= new Date(processingStartTime)
          })
          
          if (newProjects.length > 0) {
            newestProjectId = newProjects[0].id // First new project
            console.log('Checking new project:', newestProjectId, 'created at:', newProjects[0].created_at)
            
            if (!newestProjectId) return false
            
            const data = await fetchDashboardDataFromAPI(email, newestProjectId)
            
            if (isAnalysisComplete(data)) {
              setStatusMessage('✅ Analysis Complete! Redirecting to dashboard...')
              setIsReady(true)
              
              // Auto-redirect after 1 second
              setTimeout(() => {
                if (newestProjectId) {
                  router.push(`/dashboard?email=${encodeURIComponent(email)}&project=${newestProjectId}`)
                }
              }, 1000)
              
              return true // Stop polling
            }
          } else {
            console.log('No new projects found yet, waiting...')
          }
        }
        
        return false // Continue polling
      } catch (error) {
        console.error('Error checking completion:', error)
        return false
      }
    }
    
    const updateStatus = async () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setTimeElapsed(elapsed)
      
      // Check for completion every 5 seconds
      if (elapsed % 5 === 0) {
        const isComplete = await checkCompletion()
        if (isComplete) {
          clearInterval(pollInterval)
          return
        }
      }
      
      // Update status messages
      if (elapsed < 60) {
        setStatusMessage('🤖 AI is analyzing your idea...')
      } else if (elapsed < 120) {
        setStatusMessage('🔍 Researching market trends and competitors...')
      } else if (elapsed < 180) {
        setStatusMessage('🔍 Finalizing analysis...')
      } else {
        // 3 minutes passed - show failure
        setStatusMessage('❌ Processing failed. Please try again later.')
        setHasFailed(true)
        clearInterval(pollInterval)
      }
    }

    // Wait 8 seconds before first check (for n8n to process and create new row)
    setTimeout(() => {
      checkCompletion()
    }, 8000)
    
    // Update every second
    pollInterval = setInterval(updateStatus, 1000)
    
    return () => clearInterval(pollInterval)
  }, [email, router])

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
              
              {isReady ? (
                <div className="animate-pulse">
                  <div className="inline-block px-6 py-3 rounded-lg bg-green-600 text-white">
                    ✅ Redirecting to Dashboard...
                  </div>
                </div>
              ) : hasFailed ? (
                <button 
                  onClick={() => window.location.reload()}
                  className="inline-block px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  🔄 Try Again
                </button>
              ) : (
                <button 
                  disabled
                  className="inline-block px-6 py-3 rounded-lg bg-gray-400 text-white cursor-not-allowed"
                >
                  ⏳ Dashboard (Processing...)
                </button>
              )}

              
              <p className={`text-sm mt-2 ${
                isReady ? 'text-green-600' : hasFailed ? 'text-red-600' : 'text-blue-600'
              }`}>
                {isReady 
                  ? 'Automatically redirecting to your dashboard...' 
                  : hasFailed 
                  ? 'Analysis timed out. Click "Try Again" to retry.' 
                  : 'Checking completion status every 5 seconds...'
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