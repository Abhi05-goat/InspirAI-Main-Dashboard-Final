// Supabase Client Setup
// TODO: Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel environment variables
// These can be obtained from your Supabase project settings

import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    )
  }
  return supabaseClient
}

// Example: Fetch dashboard data from Supabase
export async function fetchDashboardData(userId: string) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase.from("dashboard_ideas").select("*").eq("user_id", userId).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return null
  }
}

// Example: Save dashboard data to Supabase
export async function saveDashboardData(userId: string, data: any) {
  const supabase = getSupabaseClient()

  try {
    const { data: result, error } = await supabase.from("dashboard_ideas").upsert({ user_id: userId, ...data })

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error saving dashboard data:", error)
    return null
  }
}
