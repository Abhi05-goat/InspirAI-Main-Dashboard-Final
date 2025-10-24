import { IdeaRecord } from './supabase-client'

// Client-side API functions
export async function fetchDashboardDataFromAPI(email: string): Promise<IdeaRecord | null> {
  try {
    const response = await fetch(`/api/dashboard?email=${encodeURIComponent(email)}`)
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText)
      return null
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching from API:', error)
    return null
  }
}