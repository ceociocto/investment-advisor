import { CryptoMarketData, NewsItem } from '../types/briefing'

export async function fetchCryptoMarketData(): Promise<CryptoMarketData[]> {
  const cryptocurrencies = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'AVAX', name: 'Avalanche' },
    { symbol: 'DOT', name: 'Polkadot' },
    { symbol: 'LINK', name: 'Chainlink' },
    { symbol: 'MATIC', name: 'Polygon' },
  ]

  const marketData: CryptoMarketData[] = await Promise.all(
    cryptocurrencies.map(async (crypto, index) => {
      const basePrice = crypto.symbol === 'BTC' ? 50000 : 
                       crypto.symbol === 'ETH' ? 3000 : 
                       Math.random() * 100 + 1
      const mockPrice = basePrice * (1 + (Math.random() - 0.5) * 0.1)
      const mockChange = (Math.random() - 0.5) * 15

      return {
        symbol: crypto.symbol,
        name: crypto.name,
        currentPrice: mockPrice,
        change24h: mockChange,
        marketCap: mockPrice * (Math.random() * 100 + 10) * 1000000,
        volume24h: mockPrice * (Math.random() * 10 + 1) * 1000000,
        rank: index + 1,
        news: await generateMockNews(crypto.symbol, 'crypto'),
      }
    })
  )

  return marketData.sort((a, b) => b.marketCap - a.marketCap)
}

async function generateMockNews(symbol: string, type: 'ai' | 'crypto'): Promise<NewsItem[]> {
  const cryptoNews = [
    { title: `${symbol} Breaks Key Resistance Level as Bulls Take Control`, sentiment: 'positive' as const },
    { title: `Institutional Investors Accumulate ${symbol} Amid Market Optimism`, sentiment: 'positive' as const },
    { title: `${symbol} Network Upgrade Successfully Deployed`, sentiment: 'positive' as const },
    { title: `Regulatory Concerns Weigh on ${symbol} Price Action`, sentiment: 'negative' as const },
    { title: `${symbol} Trading Volume Reaches Monthly Low`, sentiment: 'neutral' as const },
  ]

  const newsCount = Math.floor(Math.random() * 3) + 2
  const selectedNews = cryptoNews.sort(() => Math.random() - 0.5).slice(0, newsCount)

  return selectedNews.map((news) => ({
    ...news,
    url: `https://example.com/news/${symbol.toLowerCase()}`,
    publishedAt: new Date(Date.now() - Math.random() * 86400000 * 2).toISOString(),
    source: ['CoinDesk', 'CryptoSlate', 'Decrypt', 'The Block'][Math.floor(Math.random() * 4)],
    summary: `Latest developments regarding ${symbol} and cryptocurrency markets.`,
  }))
}
