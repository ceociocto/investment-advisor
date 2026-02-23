'use client'

import { useEffect, useState } from 'react'
import { BriefingData } from '@/lib/types/briefing'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  Calendar,
  DollarSign,
  Bitcoin,
  Brain,
  BarChart3,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Info
} from 'lucide-react'

export default function BriefingPage() {
  const [briefing, setBriefing] = useState<BriefingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBriefing() {
      try {
        const response = await fetch('/api/briefing')
        if (!response.ok) throw new Error('Failed to fetch briefing')
        const data = await response.json()
        setBriefing(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchBriefing()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-[#C4A77D] border-t-transparent rounded-full mb-6 mx-auto" />
          <p className="text-gray-400 text-lg">Generating Investment Briefing...</p>
        </div>
      </div>
    )
  }

  if (error || !briefing) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center text-red-400">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg">{error || 'Failed to load briefing'}</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463]/5 via-transparent to-[#034732]/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C4A77D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0A2463]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#C4A77D]/10 border border-[#C4A77D]/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#C4A77D]" />
            <span className="text-sm font-semibold text-[#C4A77D]">Weekly Investment Briefing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Global AI & Crypto <span className="gradient-text">Investment Report</span>
          </h1>
          <p className="text-xl text-gray-400">
            Week {briefing.weekNumber} • {formatDate(briefing.date)}
          </p>
        </div>

        <div className="mb-12 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Info className="w-6 h-6 mr-3 text-[#C4A77D]" />
            Executive Summary
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">{briefing.summary}</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-[#C4A77D]" />
            Key Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {briefing.keyHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#C4A77D]/30 transition-all duration-300"
              >
                <p className="text-gray-300">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <section className="bg-gradient-to-br from-[#0A2463]/10 to-transparent rounded-2xl p-8 border border-[#0A2463]/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-3 text-[#C4A77D]" />
              AI Markets
            </h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top Performers</h3>
              <div className="space-y-3">
                {briefing.aiMarkets.topPerformers.map((stock) => (
                  <div
                    key={stock.ticker}
                    className="bg-white/5 rounded-lg p-4 flex items-center justify-between border border-white/10"
                  >
                    <div>
                      <div className="font-bold text-white">{stock.ticker}</div>
                      <div className="text-sm text-gray-400">{stock.companyName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">${stock.currentPrice.toFixed(2)}</div>
                      <div className={`text-sm flex items-center ${stock.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change24h >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        {Math.abs(stock.change24h).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Market Trends</h3>
              <div className="space-y-3">
                {briefing.aiMarkets.trends.map((trend, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{trend.trend}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          trend.significance === 'high' ? 'bg-red-500/20 text-red-400' :
                          trend.significance === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {trend.significance}
                        </span>
                        {trend.direction === 'up' ? <TrendingUp className="w-5 h-5 text-green-400" /> :
                         trend.direction === 'down' ? <TrendingDown className="w-5 h-5 text-red-400" /> :
                         <Minus className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{trend.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
              <div className="space-y-3">
                {briefing.aiMarkets.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold text-white">{rec.asset}</span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${
                          rec.action === 'buy' ? 'bg-green-500/20 text-green-400' :
                          rec.action === 'sell' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {rec.action.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-[#C4A77D]">{rec.confidence}% confidence</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{rec.reasoning}</p>
                    {rec.targetPrice && (
                      <div className="text-xs text-gray-500">
                        Target: ${rec.targetPrice.toFixed(2)} • Horizon: {rec.timeHorizon}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#034732]/10 to-transparent rounded-2xl p-8 border border-[#034732]/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Bitcoin className="w-6 h-6 mr-3 text-[#C4A77D]" />
              Crypto Markets
            </h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top Performers</h3>
              <div className="space-y-3">
                {briefing.cryptoMarkets.topPerformers.map((crypto) => (
                  <div
                    key={crypto.symbol}
                    className="bg-white/5 rounded-lg p-4 flex items-center justify-between border border-white/10"
                  >
                    <div>
                      <div className="font-bold text-white">{crypto.symbol}</div>
                      <div className="text-sm text-gray-400">{crypto.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">
                        ${crypto.currentPrice >= 1 ? crypto.currentPrice.toFixed(2) : crypto.currentPrice.toFixed(6)}
                      </div>
                      <div className={`text-sm flex items-center ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {crypto.change24h >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        {Math.abs(crypto.change24h).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Market Trends</h3>
              <div className="space-y-3">
                {briefing.cryptoMarkets.trends.map((trend, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{trend.trend}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          trend.significance === 'high' ? 'bg-red-500/20 text-red-400' :
                          trend.significance === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {trend.significance}
                        </span>
                        {trend.direction === 'up' ? <TrendingUp className="w-5 h-5 text-green-400" /> :
                         trend.direction === 'down' ? <TrendingDown className="w-5 h-5 text-red-400" /> :
                         <Minus className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{trend.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
              <div className="space-y-3">
                {briefing.cryptoMarkets.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold text-white">{rec.asset}</span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${
                          rec.action === 'buy' ? 'bg-green-500/20 text-green-400' :
                          rec.action === 'sell' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {rec.action.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-[#C4A77D]">{rec.confidence}% confidence</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{rec.reasoning}</p>
                    {rec.targetPrice && (
                      <div className="text-xs text-gray-500">
                        Target: ${rec.targetPrice.toFixed(2)} • Horizon: {rec.timeHorizon}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <section className="bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl p-8 border border-red-500/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-400" />
              Risk Factors
            </h2>
            <div className="space-y-3">
              {briefing.riskFactors.map((risk, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-start space-x-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">{risk}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-blue-400" />
              Upcoming Events
            </h2>
            <div className="space-y-3">
              {briefing.upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{event.date}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                      event.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {event.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{event.event}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="bg-[#C4A77D]/10 border border-[#C4A77D]/20 rounded-xl p-6">
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-[#C4A77D]">Disclaimer:</strong> This briefing is for informational purposes only and should not be considered as financial advice. 
            All investments carry risk, and past performance does not guarantee future results. 
            Please consult with a licensed financial advisor before making investment decisions. 
            The data presented in this report is simulated and may not reflect actual market conditions.
          </p>
        </div>
      </div>
    </main>
  )
}
