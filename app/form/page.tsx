"use client"

import Header from "@/components/header"
import IdeaForm from "@/components/form/idea-form"

export default function FormPage() {
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
        
        <IdeaForm />
      </main>
    </div>
  )
}