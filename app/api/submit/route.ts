import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Submit API called')
    const formData = await request.json()
    console.log('Form data received:', formData)
    
    // Create Tally-compatible JSON structure
    const tallyPayload = {
      eventId: Math.random().toString(36) + Date.now().toString(36),
      eventType: "FORM_RESPONSE",
      createdAt: new Date().toISOString(),
      data: {
        responseId: Math.random().toString(36).substring(2, 9),
        submissionId: Math.random().toString(36).substring(2, 9),
        respondentId: Math.random().toString(36).substring(2, 9),
        formId: "custom",
        formName: "InspirAI Custom Form",
        createdAt: new Date().toISOString(),
        fields: [
          {
            key: "question_oG9bQX",
            label: "What is the domain you are focusing on?",
            type: "DROPDOWN",
            value: [formData.domain],
            options: [] // Simplified for n8n processing
          },
          {
            key: "question_Glexy2",
            label: "If \"Other\", please specify your domain",
            type: "INPUT_TEXT",
            value: formData.otherDomain || null
          },
          {
            key: "question_OGQDyp",
            label: "What is the motivation behind this idea?",
            type: "TEXTAREA",
            value: formData.motivation
          },
          {
            key: "question_VJpLAE",
            label: "Describe your idea",
            type: "TEXTAREA",
            value: formData.idea
          },
          {
            key: "question_PORded",
            label: "How confident are you about this idea on a scale of 10?",
            type: "INPUT_NUMBER",
            value: parseInt(formData.confidence)
          },
          {
            key: "question_EWqkEq",
            label: "Deadline or goal date (optional)",
            type: "INPUT_DATE",
            value: formData.deadline || null
          },
          {
            key: "question_rPDj15",
            label: "Upload optional voice note or any relevant files",
            type: "FILE_UPLOAD",
            value: null
          },
          {
            key: "question_4ra4yB",
            label: "Email address",
            type: "INPUT_EMAIL",
            value: formData.email
          },
          {
            key: "question_jPeaY6",
            label: "Consent",
            type: "CHECKBOXES",
            value: formData.consent ? ["107bdc99-f188-4158-8ade-8373b6f95c32"] : [],
            options: [
              {
                id: "107bdc99-f188-4158-8ade-8373b6f95c32",
                text: "I agree to let my idea be used for improving the AI Ideator MVP."
              }
            ]
          },
          {
            key: "question_jPeaY6_107bdc99-f188-4158-8ade-8373b6f95c32",
            label: "Consent (I agree to let my idea be used for improving the AI Ideator MVP.)",
            type: "CHECKBOXES",
            value: formData.consent
          }
        ]
      }
    }

    console.log('Payload created successfully')
    console.log('Sending to n8n webhook...')
    
    // Send to n8n cloud webhook
    const n8nResponse = await fetch('https://inspirai1234.app.n8n.cloud/webhook/inspirai-tally', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'InspirAI Custom Form'
      },
      body: JSON.stringify(tallyPayload)
    })

    console.log('n8n response status:', n8nResponse.status)
    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text()
      console.error('n8n error:', errorText)
      throw new Error(`Failed to send to n8n: ${n8nResponse.status} - ${errorText}`)
    }
    console.log('Successfully sent to n8n')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit API error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}