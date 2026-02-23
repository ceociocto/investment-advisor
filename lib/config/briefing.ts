export const briefingConfig = {
  updateInterval: 3600000, // 1 hour in milliseconds
  cacheDuration: 3600, // 1 hour in seconds
  
  aiStocks: {
    enabled: true,
    defaultTickers: ['NVDA', 'MSFT', 'GOOGL', 'AAPL', 'AMD', 'META', 'AMZN', 'TSLA'],
    sectors: ['Semiconductors', 'Software', 'Cloud Computing', 'AI & Robotics', 'Technology'],
  },
  
  crypto: {
    enabled: true,
    defaultSymbols: ['BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE', 'AVAX', 'DOT', 'LINK', 'MATIC'],
    topNCryptos: 10,
  },
  
  recommendations: {
    maxAIRecommendations: 5,
    maxCryptoRecommendations: 5,
    minConfidence: 60,
  },
  
  riskFactors: {
    maxCount: 8,
    volatilityThreshold: 5,
    overvaluationThreshold: 45,
  },
  
  upcomingEvents: {
    daysAhead: [3, 7, 14, 21, 30],
  },
}

export const apiEndpoints = {
  alphaVantage: {
    baseUrl: 'https://www.alphavantage.co/query',
    apiKey: process.env.ALPHA_VANTAGE_API_KEY || '',
  },
  coinGecko: {
    baseUrl: 'https://api.coingecko.com/api/v3',
    apiKey: process.env.COINGECKO_API_KEY || '',
  },
  newsApi: {
    baseUrl: 'https://newsapi.org/v2',
    apiKey: process.env.NEWS_API_KEY || '',
  },
}

export function isDataSourceEnabled(source: 'ai' | 'crypto'): boolean {
  if (source === 'ai') return briefingConfig.aiStocks.enabled
  if (source === 'crypto') return briefingConfig.crypto.enabled
  return false
}

export function getApiKey(source: 'alphaVantage' | 'coinGecko' | 'newsApi'): string {
  return apiEndpoints[source].apiKey
}
