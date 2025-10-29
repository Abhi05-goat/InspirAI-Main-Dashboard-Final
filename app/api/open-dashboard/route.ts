import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    console.log(`Analysis completed for ${email} - Dashboard ready`)
    
    // Return HTML that opens dashboard in new tab/window
    const openDashboardHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Analysis Complete</title>
        </head>
        <body>
          <h2>✅ Analysis Complete!</h2>
          <p>Your business idea analysis is ready.</p>
          <script>
            // Open dashboard in new tab
            window.open('/?email=${encodeURIComponent(email)}', '_blank');
            
            // Show success message
            document.body.innerHTML += '<p style="color: green; font-weight: bold;">Dashboard opened in new tab!</p>';
          </script>
        </body>
      </html>
    `
    
    return new Response(openDashboardHtml, {
      headers: { 'Content-Type': 'text/html' }
    })
  } catch (error) {
    console.error('Open dashboard error:', error)
    return NextResponse.json({ error: 'Failed to open dashboard' }, { status: 500 })
  }
}