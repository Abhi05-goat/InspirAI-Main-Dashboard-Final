"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email !== 'test@inspirai.com') {
      alert('InspirAI is currently under maintenance. Please try again later.')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/projects?email=${encodeURIComponent(email)}`)
      const data = await response.json()
      
      if (data.projects && data.projects.length > 0) {
        setProjects(data.projects)
        setShowProjects(true)
      } else {
        // No projects, go directly to form
        router.push(`/form?email=${encodeURIComponent(email)}`)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback to form
      router.push(`/form?email=${encodeURIComponent(email)}`)
    }
    
    setIsLoading(false)
  }

  const handleProjectSelect = () => {
    if (selectedProject === 'new') {
      router.push(`/form?email=${encodeURIComponent(email)}`)
    } else {
      router.push(`/dashboard?email=${encodeURIComponent(email)}&project=${selectedProject}`)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Idea with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive market analysis, competitor insights, and business validation in minutes.
          </p>
        </div>
        
        {!showProjects ? (
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Continue'}
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Select a Project</h2>
            
            <div className="mb-6">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an option...</option>
                <option value="new">🆕 Create New Project</option>
                {projects.map((project: any) => (
                  <option key={project.id} value={project.id}>
                    📊 {project.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={handleProjectSelect}
              disabled={!selectedProject}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Continue
            </button>
            
            <button
              onClick={() => setShowProjects(false)}
              className="w-full mt-2 text-gray-600 hover:text-gray-800"
            >
              ← Back to Email
            </button>
          </div>
        )}
      </main>
    </div>
  )
}