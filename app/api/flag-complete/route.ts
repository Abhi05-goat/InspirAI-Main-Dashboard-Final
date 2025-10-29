import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store for completion flags
const completionFlags = new Map<string, boolean>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Set completion flag for this email
    completionFlags.set(email, true)
    console.log(`Analysis completed for ${email} - Flag set`)
    
    return NextResponse.json({ success: true, message: 'Completion flag set' })
  } catch (error) {
    console.error('Flag complete error:', error)
    return NextResponse.json({ error: 'Failed to set flag' }, { status: 500 })
  }
}