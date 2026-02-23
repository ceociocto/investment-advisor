import { BriefingData } from '../types/briefing'
import { fetchAIMarketData } from '../data-sources/ai-markets'
import { fetchCryptoMarketData } from '../data-sources/crypto-markets'
import { 
  analyzeAIMarketTrends, 
  analyzeCryptoMarketTrends,
  generateAIRecommendations,
  generateCryptoRecommendations,
  identifyRiskFactors
} from '../data-processing/analyzer'

export async function generateBriefing(): Promise<BriefingData> {
  const now = new Date()
  const weekNumber = getWeekNumber(now)
  
  const [aiMarketData, cryptoMarketData] = await Promise.all([
    fetchAIMarketData(),
    fetchCryptoMarketData(),
  ])

  const aiTrends = analyzeAIMarketTrends(aiMarketData)
  const cryptoTrends = analyzeCryptoMarketTrends(cryptoMarketData)
  
  const aiRecommendations = generateAIRecommendations(aiMarketData, aiTrends)
  const cryptoRecommendations = generateCryptoRecommendations(cryptoMarketData, cryptoTrends)
  
  const riskFactors = identifyRiskFactors(aiMarketData, cryptoMarketData)
  const upcomingEvents = generateUpcomingEvents()

  const summary = generateSummary(aiMarketData, cryptoMarketData, aiTrends, cryptoTrends)
  const keyHighlights = generateKeyHighlights(aiMarketData, cryptoMarketData, aiRecommendations, cryptoRecommendations)

  return {
    date: now.toISOString(),
    weekNumber,
    summary,
    keyHighlights,
    aiMarkets: {
      topPerformers: aiMarketData.slice(0, 5),
      trends: aiTrends,
      recommendations: aiRecommendations,
    },
    cryptoMarkets: {
      topPerformers: cryptoMarketData.slice(0, 5),
      trends: cryptoTrends,
      recommendations: cryptoRecommendations,
    },
    riskFactors,
    upcomingEvents,
  }
}

function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

function generateSummary(
  aiData: any[],
  cryptoData: any[],
  aiTrends: any[],
  cryptoTrends: any[]
): string {
  const aiAvgChange = aiData.reduce((sum, item) => sum + item.change24h, 0) / aiData.length
  const btc = cryptoData.find((d: any) => d.symbol === 'BTC')
  
  const aiSentiment = aiAvgChange > 1 ? 'bullish' : aiAvgChange < -1 ? 'bearish' : 'neutral'
  const cryptoDirection = btc?.change24h > 0 ? 'upward' : btc?.change24h < 0 ? 'downward' : 'sideways'
  
  return `This week in AI and cryptocurrency markets shows ${aiSentiment} sentiment in the AI sector with an average change of ${aiAvgChange.toFixed(2)}%, while Bitcoin is leading the crypto market in a ${cryptoDirection} direction at $${btc?.currentPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}. Key developments include ${aiTrends[0]?.description.toLowerCase() || 'ongoing market dynamics'} and ${cryptoTrends[0]?.description.toLowerCase() || 'evolving cryptocurrency landscape'}. Investors should monitor ${aiTrends.find((t: any) => t.significance === 'high')?.trend || 'sector trends'} and maintain diversified portfolios.`
}

function generateKeyHighlights(
  aiData: any[],
  cryptoData: any[],
  aiRecs: any[],
  cryptoRecs: any[]
): string[] {
  const highlights: string[] = []
  
  const topAI = aiData[0]
  if (topAI) {
    highlights.push(`🚀 ${topAI.ticker} leads AI stocks with ${topAI.change24h.toFixed(2)}% gain, reaching $${topAI.currentPrice.toFixed(2)}`)
  }
  
  const btc = cryptoData.find((d: any) => d.symbol === 'BTC')
  if (btc) {
    highlights.push(`₿ Bitcoin at $${btc.currentPrice.toLocaleString(undefined, {maximumFractionDigits: 2})} (${btc.change24h > 0 ? '+' : ''}${btc.change24h.toFixed(2)}%) with $${(btc.marketCap / 1e9).toFixed(1)}B market cap`)
  }
  
  const topAIRec = aiRecs.find(r => r.action === 'buy')
  if (topAIRec) {
    highlights.push(`💡 Top AI Pick: ${topAIRec.asset} - ${topAIRec.reasoning.substring(0, 80)}...`)
  }
  
  const topCryptoRec = cryptoRecs.find(r => r.action === 'buy' && r.asset !== 'BTC')
  if (topCryptoRec) {
    highlights.push(`⭐ Top Crypto Pick: ${topCryptoRec.asset} - ${topCryptoRec.reasoning.substring(0, 80)}...`)
  }
  
  const growthStocks = aiData.filter((d: any) => d.change24h > 3).length
  highlights.push(`📈 ${growthStocks} AI stocks showing strong momentum (+3% or more)`)
  
  return highlights
}

function generateUpcomingEvents(): Array<{ date: string; event: string; impact: 'high' | 'medium' | 'low' }> {
  const events: Array<{ date: string; event: string; impact: 'high' | 'medium' | 'low' }> = []
  const now = new Date()
  
  const upcomingDays = [3, 7, 14, 21, 30]
  upcomingDays.forEach(days => {
    const eventDate = new Date(now)
    eventDate.setDate(eventDate.getDate() + days)
    
    const eventTemplates = [
      { event: 'FOMC Meeting - Interest Rate Decision', impact: 'high' as const },
      { event: 'Major Tech Company Earnings Release', impact: 'medium' as const },
      { event: 'Crypto Industry Conference', impact: 'medium' as const },
      { event: 'AI Regulation Committee Hearing', impact: 'high' as const },
      { event: 'Economic Data Release (CPI/PPI)', impact: 'medium' as const },
      { event: 'Blockchain Network Upgrade', impact: 'low' as const },
    ]
    
    const selectedEvent = eventTemplates[days % eventTemplates.length]
    events.push({
      date: eventDate.toISOString().split('T')[0],
      ...selectedEvent,
    })
  })
  
  return events
}
