"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const DOMAIN_OPTIONS = [
  { id: "95e4b5f6-6ca9-417a-8766-3ec92f8e0146", text: "Social & Community (friendship, dating, local events, group platforms)" },
  { id: "be525562-3d32-406e-b69b-74c28d647b2f", text: "Education & Learning (study tools, tutoring, skills, career prep)" },
  { id: "343e2169-c72a-4f36-a38a-e5b8c370a7ae", text: "Finance & Money (budgeting, investing, payments, side income)" },
  { id: "45abdf1f-02a5-4615-a5d3-deec83703389", text: "Health & Wellness (fitness, mental health, mindfulness, nutrition)" },
  { id: "b2b139b3-f30c-4d97-9490-a7e93df5285c", text: "Lifestyle & Productivity (habits, organization, time management, daily life)" },
  { id: "6a4da1ea-8b2f-4eff-a1c0-77d7c0b09e67", text: "Creativity & Media (content creation, music, design, storytelling)" },
  { id: "cb5d36d8-be3c-4dea-a345-25d2d97887d7", text: "Work & Careers (freelancing, jobs, portfolio tools, professional growth)" },
  { id: "4cdb6611-a42d-4bbc-af7f-1a8b67202791", text: "Fashion & Beauty (style, customization, sustainability, self-expression)" },
  { id: "9dd51920-9327-4c04-b6e9-0bf7339355ad", text: "Sustainability & Impact (climate, environment, social causes, volunteering)" },
  { id: "71751c03-92ae-4211-a5e5-cee7c5af21fa", text: "Gaming & Entertainment (games, esports, streaming, virtual worlds)" },
  { id: "6e2fbe04-9cad-4021-8b8b-25cf496cd1e4", text: "Other" }
]

export default function IdeaForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    domain: "",
    otherDomain: "",
    motivation: "",
    idea: "",
    confidence: 5,
    deadline: "",
    email: "",
    consent: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        // Redirect to dashboard with new=true for polling
        router.push(`/?email=${encodeURIComponent(formData.email)}&new=true`)
      } else {
        const errorText = await response.text()
        console.error('API Response:', response.status, errorText)
        throw new Error(`Submission failed: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Domain Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What domain are you focusing on? *
          </label>
          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a domain...</option>
            {DOMAIN_OPTIONS.map(option => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        {/* Other Domain */}
        {formData.domain === "6e2fbe04-9cad-4021-8b8b-25cf496cd1e4" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please specify your domain
            </label>
            <input
              type="text"
              name="otherDomain"
              value={formData.otherDomain}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Motivation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What is the motivation behind this idea? *
          </label>
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Idea Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your idea *
          </label>
          <textarea
            name="idea"
            value={formData.idea}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confidence */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How confident are you about this idea? (1-10) *
          </label>
          <input
            type="number"
            name="confidence"
            value={formData.confidence}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deadline or goal date (optional)
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Consent */}
        <div className="flex items-start">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
            className="mt-1 mr-3"
          />
          <label className="text-sm text-gray-700">
            I agree to let my idea be used for improving the AI Ideator MVP. *
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Analyzing Your Idea...' : 'Analyze My Idea'}
        </button>
      </form>
    </div>
  )
}