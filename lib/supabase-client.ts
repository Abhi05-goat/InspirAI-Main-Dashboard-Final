import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript interface for ideas table
export interface IdeaRecord {
  id: string
  created_at: string
  email: string
  domain: string
  motivation: string
  raw_idea: string
  confidence: number
  consent: boolean
  attachments: any
  Groq_PS_output: {
    title: string
    refined_idea: string
    confidence_reason: string
    problem_statement: string
    proposed_solution: string
  }
  Groq_PS_raw: string
  Perplexity_trend_output: {
    trends: string[]
    analysis: Record<string, {
      cons: string[]
      pros: string[]
      opportunity: string
    }>
    niche_identification: string[]
  }
  visualization_code: string | null
  Perplexity_trend_output_raw: string
  search_citations: string[]
}

// Fetch dashboard data by email
export async function fetchDashboardData(email: string): Promise<IdeaRecord | null> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return null
  }
}