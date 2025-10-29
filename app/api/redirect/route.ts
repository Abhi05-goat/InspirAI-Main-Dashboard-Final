import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  
  if (!email) {
    return NextResponse.redirect(new URL('/?error=no-email', request.url))
  }
  
  const dashboardUrl = new URL('/', request.url)
  dashboardUrl.searchParams.set('email', email)
  dashboardUrl.searchParams.set('new', 'true')
  
  return NextResponse.redirect(dashboardUrl.toString())
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const email = formData.email || formData.data?.email || formData.fields?.email
    
    if (!email) {
      return NextResponse.json({ error: 'Email not found in webhook data' }, { status: 400 })
    }
    
    // Send HTML response that redirects the browser
    const redirectHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=/?email=${encodeURIComponent(email)}&new=true">
        </head>
        <body>
          <p>Redirecting to your dashboard...</p>
          <script>window.location.href = '/?email=${encodeURIComponent(email)}&new=true';</script>
        </body>
      </html>
    `
    
    return new Response(redirectHtml, {
      headers: { 'Content-Type': 'text/html' }
    })
  } catch (error) {
    console.error('Redirect error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}