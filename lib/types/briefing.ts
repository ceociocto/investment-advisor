export interface AIMarketData {
  sector: string
  companyName: string
  ticker: string
  currentPrice: number
  change24h: number
  marketCap: number
  volume24h: number
  peRatio?: number
  news: NewsItem[]
}

export interface CryptoMarketData {
  symbol: string
  name: string
  currentPrice: number
  change24h: number
  marketCap: number
  volume24h: number
  rank: number
  news: NewsItem[]
}

export interface NewsItem {
  title: string
  url: string
  publishedAt: string
  source: string
  sentiment: 'positive' | 'neutral' | 'negative'
  summary: string
}

export interface MarketTrend {
  category: 'ai' | 'crypto'
  trend: string
  direction: 'up' | 'down' | 'neutral'
  significance: 'high' | 'medium' | 'low'
  description: string
}

export interface InvestmentRecommendation {
  asset: string
  type: 'ai_stock' | 'crypto'
  action: 'buy' | 'hold' | 'sell'
  confidence: number
  reasoning: string
  targetPrice?: number
  timeHorizon: 'short' | 'medium' | 'long'
}

export interface BriefingData {
  date: string
  weekNumber: number
  summary: string
  keyHighlights: string[]
  aiMarkets: {
    topPerformers: AIMarketData[]
    trends: MarketTrend[]
    recommendations: InvestmentRecommendation[]
  }
  cryptoMarkets: {
    topPerformers: CryptoMarketData[]
    trends: MarketTrend[]
    recommendations: InvestmentRecommendation[]
  }
  riskFactors: string[]
  upcomingEvents: {
    date: string
    event: string
    impact: 'high' | 'medium' | 'low'
  }[]
}

export interface DataSourceConfig {
  enabled: boolean
  apiKey?: string
  endpoint?: string
  rateLimit?: number
}
