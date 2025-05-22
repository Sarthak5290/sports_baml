import { NextRequest, NextResponse } from 'next/server'
import { b } from '../../../../baml_client'

export async function POST(request: NextRequest) {
  try {
    console.log('=== API Route Debug ===')
    
    // Check if GROQ_API_KEY is set
    console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY)
    console.log('GROQ_API_KEY starts with:', process.env.GROQ_API_KEY?.substring(0, 10) + '...')
    
    const { sport_name } = await request.json()
    console.log('Received sport_name:', sport_name)
    
    if (!sport_name) {
      return NextResponse.json(
        { error: 'Sport name is required' }, 
        { status: 400 }
      )
    }

    console.log('About to call b.GetSportInfo...')
    
    // Call the BAML function on the server side
    const sportInfo = await b.GetSportInfo(sport_name)
    
    console.log('BAML response received:', sportInfo)
    
    return NextResponse.json(sportInfo)
    
  } catch (error) {
    console.error('=== API Route Error ===')
    console.error('Error type:', error?.constructor?.name)
    console.error('Error message:', error?.message)
    console.error('Full error:', error)
    console.error('Stack trace:', error?.stack)
    
    return NextResponse.json(
      { 
        error: 'Failed to get sport information',
        details: error?.message || 'Unknown error',
        type: error?.constructor?.name || 'Unknown'
      }, 
      { status: 500 }
    )
  }
}