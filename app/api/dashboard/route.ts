import { NextRequest, NextResponse } from 'next/server'
import { fetchDashboardData } from '@/lib/supabase-client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const projectId = searchParams.get('project')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID parameter is required' },
        { status: 400 }
      )
    }

    const data = await fetchDashboardData(email, projectId)

    if (!data) {
      return NextResponse.json(
        { error: 'No data found for this email' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}