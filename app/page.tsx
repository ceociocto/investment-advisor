'use client'

import { useState } from 'react'

interface Strategy {
  id: string
  name: string
  risk: 'Conservative' | 'Moderate' | 'Aggressive'
  description: string
  expectedReturn: string
  allocation: { asset: string; percentage: number }[]
}

export default function Home() {
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium')
  const [investmentAmount, setInvestmentAmount] = useState('10000')
  const [timeHorizon, setTimeHorizon] = useState('5')
  const [showResult, setShowResult] = useState(false)

  const generateStrategy = (): Strategy => {
    const strategies: Record<string, Strategy> = {
      low: {
        id: 'conservative',
        name: 'Conservative Growth Strategy',
        risk: 'Conservative',
        description: 'Focus on capital preservation with steady, reliable returns through bonds and stable dividend-paying stocks.',
        expectedReturn: '4-6% annually',
        allocation: [
          { asset: 'Government Bonds', percentage: 40 },
          { asset: 'Investment-Grade Corporate Bonds', percentage: 25 },
          { asset: 'Blue-Chip Dividend Stocks', percentage: 25 },
          { asset: 'Cash & Equivalents', percentage: 10 },
        ],
      },
      medium: {
        id: 'balanced',
        name: 'Balanced Growth Strategy',
        risk: 'Moderate',
        description: 'A balanced approach combining growth stocks with stable fixed-income investments for steady appreciation.',
        expectedReturn: '7-9% annually',
        allocation: [
          { asset: 'Large-Cap Growth Stocks', percentage: 35 },
          { asset: 'International Equities', percentage: 20 },
          { asset: 'Corporate Bonds', percentage: 25 },
          { asset: 'Real Estate Investment Trusts', percentage: 10 },
          { asset: 'Cash & Alternatives', percentage: 10 },
        ],
      },
      high: {
        id: 'aggressive',
        name: 'Aggressive Growth Strategy',
        risk: 'Aggressive',
        description: 'Maximize long-term returns through concentrated positions in high-growth sectors and emerging markets.',
        expectedReturn: '10-15% annually',
        allocation: [
          { asset: 'Technology Stocks', percentage: 40 },
          { asset: 'Emerging Markets', percentage: 20 },
          { asset: 'Small-Cap Growth Stocks', percentage: 20 },
          { asset: 'Cryptocurrency & Digital Assets', percentage: 10 },
          { asset: 'Cash & Options', percentage: 10 },
        ],
      },
    }

    return strategies[riskTolerance]
  }

  const strategy = showResult ? generateStrategy() : null

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">InvestIQ</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Investment Strategies</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Strategies</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Personal Investment Strategy Advisor
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Get AI-powered investment recommendations tailored to your risk tolerance and financial goals.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Strategies Generated</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="text-3xl font-bold text-green-600">$2.5B+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Assets Analyzed</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Calculator */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Create Your Investment Strategy
          </h3>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-lg">
            {/* Risk Tolerance */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Risk Tolerance
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setRiskTolerance(level)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      riskTolerance === level
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Amount */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Investment Amount (USD)
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>

            {/* Time Horizon */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Investment Timeline (Years)
              </label>
              <input
                type="number"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter years"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={() => setShowResult(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Generate Investment Strategy
            </button>
          </div>
        </div>
      </section>

      {/* Strategy Results */}
      {showResult && strategy && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Strategy Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <h3 className="text-3xl font-bold text-white mb-2">{strategy.name}</h3>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    strategy.risk === 'Conservative' ? 'bg-green-500' :
                    strategy.risk === 'Moderate' ? 'bg-yellow-500' :
                    'bg-red-500'
                  } text-white`}>
                    {strategy.risk} Risk
                  </span>
                  <span className="text-white text-sm">Expected Return: {strategy.expectedReturn}</span>
                </div>
              </div>

              {/* Strategy Details */}
              <div className="p-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                  {strategy.description}
                </p>

                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Recommended Asset Allocation
                </h4>

                <div className="space-y-4">
                  {strategy.allocation.map((item) => (
                    <div key={item.asset} className="flex items-center">
                      <div className="w-48 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.asset}
                      </div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-1000 ease-out"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="w-20 text-right text-sm font-bold text-gray-900 dark:text-white">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Investment Breakdown */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Your Investment Breakdown
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {strategy.allocation.map((item) => {
                      const amount = (parseInt(investmentAmount) * item.percentage) / 100
                      return (
                        <div key={item.asset} className="bg-slate-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {item.asset}
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {item.percentage}% of portfolio
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Disclaimer:</strong> This is a simulated investment strategy for demonstration purposes only.
                    Not actual financial advice. Please consult a licensed financial advisor before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 InvestIQ. Demo for voice modification testing.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Simulated investment strategies - Not actual financial advice.
          </p>
        </div>
      </footer>
    </main>
  )
}
