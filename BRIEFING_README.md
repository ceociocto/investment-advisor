# AI & Crypto Investment Briefing System

## Overview

This system generates comprehensive weekly investment briefings focusing on global AI and cryptocurrency markets. It provides market analysis, trends, investment recommendations, and risk assessments.

## Features

- **Real-time Market Data**: Fetches data for AI stocks and cryptocurrencies
- **Trend Analysis**: Identifies key market trends and momentum indicators
- **Investment Recommendations**: Generates buy/hold/sell recommendations with confidence scores
- **Risk Assessment**: Identifies potential risk factors in the market
- **Upcoming Events**: Tracks important market events that may impact investments
- **Automated Reporting**: Generates detailed weekly briefings automatically

## Architecture

```
lib/
├── types/
│   └── briefing.ts              # TypeScript type definitions
├── data-sources/
│   ├── ai-markets.ts           # AI stock market data fetcher
│   └── crypto-markets.ts       # Cryptocurrency market data fetcher
├── data-processing/
│   └── analyzer.ts             # Market analysis and recommendation engine
├── briefing/
│   └── generator.ts            # Briefing generation orchestrator
└── config/
    └── briefing.ts             # Configuration settings

app/
├── api/
│   └── briefing/
│       └── route.ts           # API endpoint for briefing data
└── briefing/
    └── page.tsx               # Briefing display page
```

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Add your API keys:
- **Alpha Vantage**: For stock market data (get free key at https://www.alphavantage.co)
- **CoinGecko**: For cryptocurrency data (get free key at https://www.coingecko.com)
- **News API**: For financial news (get free key at https://newsapi.org)

### 2. Installation

```bash
npm install
```

### 3. Development

```bash
npm run dev
```

The briefing will be available at: `http://localhost:3000/briefing`

## Usage

### Accessing the Briefing

1. Navigate to `/briefing` to view the latest weekly briefing
2. The briefing is automatically generated with the latest market data
3. Data is cached for 1 hour to optimize performance

### API Endpoint

Get the briefing data as JSON:

```bash
GET /api/briefing
```

Response includes:
- Executive summary
- Key highlights
- AI market analysis (top performers, trends, recommendations)
- Crypto market analysis (top performers, trends, recommendations)
- Risk factors
- Upcoming events

## Configuration

Edit `lib/config/briefing.ts` to customize:

- Update intervals
- Stock tickers to track
- Cryptocurrencies to monitor
- Recommendation parameters
- Risk thresholds

## Data Sources

### AI Stocks

Currently tracks major AI companies:
- NVIDIA (NVDA)
- Microsoft (MSFT)
- Alphabet/Google (GOOGL)
- Apple (AAPL)
- AMD (AMD)
- Meta (META)
- Amazon (AMZN)
- Tesla (TSLA)

### Cryptocurrencies

Tracks top cryptocurrencies by market cap:
- Bitcoin (BTC)
- Ethereum (ETH)
- Solana (SOL)
- Ripple (XRP)
- Cardano (ADA)
- Dogecoin (DOGE)
- Avalanche (AVAX)
- Polkadot (DOT)
- Chainlink (LINK)
- Polygon (MATIC)

## Investment Recommendation Logic

### AI Stocks

- **Buy**: Strong momentum + reasonable P/E ratio (< 35)
- **Buy**: Undervalued (low P/E < 25) after pullback
- **Hold**: Overvalued (P/E > 50) with strong performance

### Cryptocurrencies

- **Buy**: Bitcoin pullback (> -5%)
- **Hold**: Bitcoin strong momentum (> +5%)
- **Buy**: Ethereum based on ETH/BTC ratio
- **Buy**: Altcoins showing strong momentum (> +3%)

## Risk Assessment

The system identifies risks based on:

- High volatility in sector stocks
- Extreme cryptocurrency volatility
- Overvaluation concerns (high P/E ratios)
- Low market cap liquidity
- Regulatory uncertainty
- Geopolitical factors

## Customization

### Adding New Data Sources

1. Create a new file in `lib/data-sources/`
2. Implement the fetch function
3. Add analysis logic in `lib/data-processing/analyzer.ts`
4. Update the briefing generator

### Modifying Recommendations

Edit `lib/data-processing/analyzer.ts`:
- `generateAIRecommendations()`: AI stock recommendation logic
- `generateCryptoRecommendations()`: Crypto recommendation logic

### Changing the Display

Edit `app/briefing/page.tsx` to customize the UI.

## Future Enhancements

- [ ] Real-time WebSocket connections for live data
- [ ] Email notifications for new briefings
- [ ] Historical briefing archive
- [ ] Custom alert system
- [ ] Portfolio tracking integration
- [ ] Sentiment analysis from social media
- [ ] Machine learning for improved predictions

## Disclaimer

**This system is for informational purposes only and should not be considered as financial advice.**

All investments carry risk, and past performance does not guarantee future results. The data presented is simulated and may not reflect actual market conditions. Please consult with a licensed financial advisor before making investment decisions.

## License

This project is for demonstration purposes only.
