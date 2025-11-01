import { IdeaRecord } from './supabase-client'

// Client-side API functions
export async function fetchDashboardDataFromAPI(email: string, projectId?: string): Promise<IdeaRecord | null> {
  try {
    const url = projectId 
      ? `/api/dashboard?email=${encodeURIComponent(email)}&project=${encodeURIComponent(projectId)}`
      : `/api/dashboard?email=${encodeURIComponent(email)}`
    const response = await fetch(url)
    
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