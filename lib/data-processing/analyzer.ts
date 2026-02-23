import { AIMarketData, CryptoMarketData, MarketTrend, InvestmentRecommendation } from '../types/briefing'

export function analyzeAIMarketTrends(data: AIMarketData[]): MarketTrend[] {
  const trends: MarketTrend[] = []
  
  const avgChange = data.reduce((sum, item) => sum + item.change24h, 0) / data.length
  const topGainers = data.filter(item => item.change24h > 0).length
  const bullishMomentum = topGainers / data.length > 0.6

  trends.push({
    category: 'ai',
    trend: 'AI Sector Performance',
    direction: avgChange > 0 ? 'up' : avgChange < 0 ? 'down' : 'neutral',
    significance: Math.abs(avgChange) > 3 ? 'high' : Math.abs(avgChange) > 1 ? 'medium' : 'low',
    description: `The AI sector is ${avgChange > 0 ? 'showing strength' : 'facing pressure'} with an average change of ${avgChange.toFixed(2)}%. ${bullishMomentum ? 'Broad-based bullish momentum observed across multiple stocks.' : 'Mixed performance across the sector.'}`,
  })

  const semiconductors = data.filter(d => d.sector === 'Semiconductors')
  if (semiconductors.length > 0) {
    const semiAvgChange = semiconductors.reduce((sum, item) => sum + item.change24h, 0) / semiconductors.length
    trends.push({
      category: 'ai',
      trend: 'Semiconductor Industry',
      direction: semiAvgChange > 2 ? 'up' : semiAvgChange < -2 ? 'down' : 'neutral',
      significance: 'high',
      description: `Semiconductor stocks, critical for AI infrastructure, are ${semiAvgChange > 0 ? 'leading gains' : 'showing weakness'} with ${semiconductorKeywords(semiAvgChange)} sentiment in the chip market.`,
    })
  }

  const softwareCompanies = data.filter(d => d.sector === 'Software')
  if (softwareCompanies.length > 0) {
    const softwareAvgChange = softwareCompanies.reduce((sum, item) => sum + item.change24h, 0) / softwareCompanies.length
    trends.push({
      category: 'ai',
      trend: 'Software & Cloud Services',
      direction: softwareAvgChange > 0 ? 'up' : 'down',
      significance: 'medium',
      description: `AI software and cloud services providers are experiencing ${softwareAvgChange > 0 ? 'positive momentum' : 'consolidation'} as enterprise adoption continues.`,
    })
  }

  return trends
}

function semiconductorKeywords(avgChange: number): string {
  if (avgChange > 3) return 'strong'
  if (avgChange > 1) return 'moderate'
  if (avgChange > -1) return 'neutral'
  if (avgChange > -3) return 'cautious'
  return 'bearish'
}

export function analyzeCryptoMarketTrends(data: CryptoMarketData[]): MarketTrend[] {
  const trends: MarketTrend[] = []
  
  const btc = data.find(d => d.symbol === 'BTC')
  const eth = data.find(d => d.symbol === 'ETH')
  
  if (btc) {
    const direction = btc.change24h > 3 ? 'up' : btc.change24h < -3 ? 'down' : 'neutral'
    trends.push({
      category: 'crypto',
      trend: 'Bitcoin Market Leadership',
      direction,
      significance: 'high',
      description: `Bitcoin is ${direction === 'up' ? 'showing strength' : direction === 'down' ? 'under pressure' : 'consolidating'} at $${btc.currentPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}, ${btc.change24h > 0 ? 'driving' : 'influencing'} broader market sentiment.`,
    })
  }

  const totalMarketCap = data.reduce((sum, item) => sum + item.marketCap, 0)
  const altCoinMarketCap = totalMarketCap - (btc?.marketCap || 0)
  const altCoinDominance = altCoinMarketCap / totalMarketCap

  trends.push({
    category: 'crypto',
    trend: 'Altcoin Market Activity',
    direction: altCoinDominance > 0.4 ? 'up' : 'neutral',
    significance: altCoinDominance > 0.4 ? 'high' : 'medium',
    description: `Alternative cryptocurrencies represent ${(altCoinDominance * 100).toFixed(1)}% of total market cap, indicating ${altCoinDominance > 0.4 ? 'strong diversification' : 'Bitcoin dominance'} in the market.`,
  })

  const defiTokens = data.filter(d => ['UNI', 'AAVE', 'LINK', 'MATIC'].includes(d.symbol))
  if (defiTokens.length > 0) {
    const defiAvgChange = defiTokens.reduce((sum, item) => sum + item.change24h, 0) / defiTokens.length
    trends.push({
      category: 'crypto',
      trend: 'DeFi Sector Performance',
      direction: defiAvgChange > 0 ? 'up' : 'down',
      significance: 'medium',
      description: `Decentralized Finance tokens are ${defiAvgChange > 0 ? 'gaining traction' : 'facing headwinds'} as the sector continues to evolve.`,
    })
  }

  return trends
}

export function generateAIRecommendations(marketData: AIMarketData[], trends: MarketTrend[]): InvestmentRecommendation[] {
  const recommendations: InvestmentRecommendation[] = []

  const topPerformers = marketData
    .filter(item => item.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 2)

  topPerformers.forEach(stock => {
    if (stock.peRatio && stock.peRatio < 35) {
      recommendations.push({
        asset: stock.ticker,
        type: 'ai_stock',
        action: 'buy',
        confidence: Math.min(85, 60 + stock.change24h * 2),
        reasoning: `Strong momentum (${stock.change24h.toFixed(2)}% gain) with reasonable valuation (P/E: ${stock.peRatio.toFixed(1)}). ${stock.sector} sector showing positive trends.`,
        targetPrice: stock.currentPrice * 1.15,
        timeHorizon: 'medium',
      })
    }
  })

  const undervalued = marketData
    .filter(item => item.change24h < 0 && item.peRatio && item.peRatio < 25)
    .sort((a, b) => a.peRatio! - b.peRatio!)
    .slice(0, 1)

  undervalued.forEach(stock => {
    recommendations.push({
      asset: stock.ticker,
      type: 'ai_stock',
      action: 'buy',
      confidence: 70,
      reasoning: `Attractive entry point after recent pullback. Low P/E ratio (${stock.peRatio!.toFixed(1)}) suggests potential upside as ${stock.sector} recovers.`,
      targetPrice: stock.currentPrice * 1.20,
      timeHorizon: 'long',
    })
  })

  const overvalued = marketData
    .filter(item => item.peRatio && item.peRatio > 50 && item.change24h > 5)
    .sort((a, b) => b.peRatio! - a.peRatio!)
    .slice(0, 1)

  overvalued.forEach(stock => {
    recommendations.push({
      asset: stock.ticker,
      type: 'ai_stock',
      action: 'hold',
      confidence: 65,
      reasoning: `Extended valuation (P/E: ${stock.peRatio!.toFixed(1)}) despite strong performance. Consider taking partial profits while maintaining core position.`,
      targetPrice: stock.currentPrice * 1.05,
      timeHorizon: 'short',
    })
  })

  return recommendations
}

export function generateCryptoRecommendations(marketData: CryptoMarketData[], trends: MarketTrend[]): InvestmentRecommendation[] {
  const recommendations: InvestmentRecommendation[] = []

  const btc = marketData.find(d => d.symbol === 'BTC')
  const eth = marketData.find(d => d.symbol === 'ETH')

  if (btc) {
    const action = btc.change24h > 5 ? 'hold' : btc.change24h < -5 ? 'buy' : 'hold'
    recommendations.push({
      asset: 'BTC',
      type: 'crypto',
      action,
      confidence: 75,
      reasoning: `Bitcoin at $${btc.currentPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}. ${btc.change24h > 5 ? 'Strong momentum - consider holding existing positions' : btc.change24h < -5 ? 'Pullback may present accumulation opportunity' : 'Consolidation phase - maintain current allocation'}. Market cap: $${(btc.marketCap / 1e9).toFixed(1)}B.`,
      targetPrice: btc.currentPrice * (action === 'buy' ? 1.25 : 1.10),
      timeHorizon: action === 'buy' ? 'medium' : 'long',
    })
  }

  if (eth) {
    const ethBtcRatio = eth.currentPrice / btc!.currentPrice
    recommendations.push({
      asset: 'ETH',
      type: 'crypto',
      action: ethBtcRatio > 0.06 ? 'hold' : 'buy',
      confidence: 70,
      reasoning: `Ethereum showing ${eth.change24h > 0 ? 'strength' : 'resilience'} against BTC. Current ETH/BTC ratio: ${ethBtcRatio.toFixed(4)}. Smart contract platform adoption continues to grow.`,
      targetPrice: eth.currentPrice * 1.30,
      timeHorizon: 'long',
    })
  }

  const topAltcoins = marketData
    .filter(d => !['BTC', 'ETH'].includes(d.symbol) && d.change24h > 3)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 2)

  topAltcoins.forEach(crypto => {
    recommendations.push({
      asset: crypto.symbol,
      type: 'crypto',
      action: 'buy',
      confidence: 60,
      reasoning: `${crypto.name} showing strong momentum (${crypto.change24h.toFixed(2)}%). Rank #${crypto.rank} by market cap with $${(crypto.marketCap / 1e9).toFixed(2)}B valuation.`,
      targetPrice: crypto.currentPrice * 1.40,
      timeHorizon: 'medium',
    })
  })

  return recommendations
}

export function identifyRiskFactors(aiData: AIMarketData[], cryptoData: CryptoMarketData[]): string[] {
  const risks: string[] = []

  const aiVolatility = aiData.some(d => Math.abs(d.change24h) > 5)
  if (aiVolatility) {
    risks.push('High volatility in AI sector stocks - investors should be prepared for significant price swings')
  }

  const cryptoVolatility = cryptoData.some(d => Math.abs(d.change24h) > 10)
  if (cryptoVolatility) {
    risks.push('Extreme cryptocurrency volatility - allocate only what you can afford to lose')
  }

  const overvaluedAI = aiData.filter(d => d.peRatio && d.peRatio > 45).length
  if (overvaluedAI > 3) {
    risks.push(`${overvaluedAI} AI stocks with P/E ratios above 45 - potential valuation concerns in the sector`)
  }

  const btc = cryptoData.find(d => d.symbol === 'BTC')
  if (btc && btc.marketCap < 500e9) {
    risks.push('Bitcoin market cap below $500B - lower liquidity and higher sensitivity to large trades')
  }

  risks.push('Regulatory uncertainty continues to impact both AI and cryptocurrency markets')
  risks.push('Geopolitical tensions could affect global technology supply chains and market sentiment')

  return risks
}
