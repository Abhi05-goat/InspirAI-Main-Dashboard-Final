import { NextRequest, NextResponse } from 'next/server'

// Import the same completion flags store
const completionFlags = new Map<string, boolean>()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Check if processing is complete for this email
    const isReady = completionFlags.get(email) || false
    
    return NextResponse.json({ ready: isReady, email })
  } catch (error) {
    console.error('Check status error:', error)
    return NextResponse.json({ error: 'Failed to check status' }, { status: 500 })
  }
}