import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('ideas')
      .select('id, project_name, created_at, Groq_PS_output, Perplexity_trend_output')
      .eq('email', email)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    const projects = data.map(project => ({
      id: project.id,
      name: project.project_name || 'Untitled Project',
      created_at: project.created_at,
      status: (project.Groq_PS_output && project.Perplexity_trend_output) ? 'complete' : 'processing'
    }))

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}