import { NextResponse } from 'next/server'
import { generateBriefing } from '@/lib/briefing/generator'

export async function GET() {
  try {
    const briefing = await generateBriefing()
    
    return NextResponse.json(briefing, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error generating briefing:', error)
    return NextResponse.json(
      { error: 'Failed to generate briefing' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 3600
