import { AIMarketData, NewsItem } from '../types/briefing'

export async function fetchAIMarketData(): Promise<AIMarketData[]> {
  const aiStocks = [
    { ticker: 'NVDA', name: 'NVIDIA Corporation', sector: 'Semiconductors' },
    { ticker: 'MSFT', name: 'Microsoft Corporation', sector: 'Software' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Software' },
    { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
    { ticker: 'AMD', name: 'Advanced Micro Devices', sector: 'Semiconductors' },
    { ticker: 'META', name: 'Meta Platforms Inc.', sector: 'Software' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'Cloud Computing' },
    { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'AI & Robotics' },
  ]

  const marketData: AIMarketData[] = await Promise.all(
    aiStocks.map(async (stock) => {
      const mockPrice = Math.random() * 500 + 100
      const mockChange = (Math.random() - 0.5) * 10
      
      return {
        sector: stock.sector,
        companyName: stock.name,
        ticker: stock.ticker,
        currentPrice: mockPrice,
        change24h: mockChange,
        marketCap: mockPrice * (Math.random() * 10 + 1) * 1000000000,
        volume24h: mockPrice * (Math.random() * 5 + 1) * 1000000,
        peRatio: Math.random() * 50 + 15,
        news: await generateMockNews(stock.ticker, 'ai'),
      }
    })
  )

  return marketData.sort((a, b) => b.change24h - a.change24h)
}

async function generateMockNews(ticker: string, type: 'ai' | 'crypto'): Promise<NewsItem[]> {
  const aiNews = [
    { title: `${ticker} Announces Breakthrough in AI Technology`, sentiment: 'positive' as const },
    { title: `${ticker} Stock Surges on Strong Earnings Report`, sentiment: 'positive' as const },
    { title: `Analysts Upgrade ${ticker} Price Target Following AI Product Launch`, sentiment: 'positive' as const },
    { title: `${ticker} Faces Regulatory Scrutiny Over AI Practices`, sentiment: 'negative' as const },
    { title: `Market Volatility Impacts ${ticker} Trading Volume`, sentiment: 'neutral' as const },
  ]

  const newsCount = Math.floor(Math.random() * 3) + 2
  const selectedNews = aiNews.sort(() => Math.random() - 0.5).slice(0, newsCount)

  return selectedNews.map((news) => ({
    ...news,
    url: `https://example.com/news/${ticker.toLowerCase()}`,
    publishedAt: new Date(Date.now() - Math.random() * 86400000 * 2).toISOString(),
    source: ['TechCrunch', 'Bloomberg', 'Reuters', 'WSJ'][Math.floor(Math.random() * 4)],
    summary: `Latest developments regarding ${ticker} and its impact on the market.`,
  }))
}
