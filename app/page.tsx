'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Shield, BarChart3, DollarSign, Clock, ArrowRight, CheckCircle2, Award, Building2, LineChart as LineChartIcon, Lock, Percent, Sparkles } from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'

interface Strategy {
  id: string
  name: string
  risk: 'Conservative' | 'Moderate' | 'Aggressive'
  description: string
  expectedReturn: string
  allocation: { asset: string; percentage: number; color: string }[]
  historicalData: Array<{ year: number; value: number }>
  metrics: {
    expenseRatio: string
    minInvestment: string
    taxEfficiency: 'High' | 'Medium' | 'Low'
  }
}

const COLORS = ['#C4A77D', '#0A2463', '#034732', '#1e3a8a', '#065f46', '#3D5A80', '#EE6C4D', '#293241']

export default function Home() {
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium')
  const [investmentAmount, setInvestmentAmount] = useState('10000')
  const [timeHorizon, setTimeHorizon] = useState('5')
  const [showResult, setShowResult] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const generateStrategy = (): Strategy => {
    const strategies: Record<string, Strategy> = {
      low: {
        id: 'conservative',
        name: 'Conservative Income Strategy',
        risk: 'Conservative',
        description: 'Designed for investors seeking capital preservation and steady income with minimal volatility. Focus on high-quality bonds and dividend-paying stocks.',
        expectedReturn: '4-6% annually',
        allocation: [
          { asset: 'U.S. Treasury Bonds', percentage: 35, color: COLORS[0] },
          { asset: 'Investment-Grade Corporate Bonds', percentage: 30, color: COLORS[1] },
          { asset: 'Dividend Aristocrats', percentage: 20, color: COLORS[2] },
          { asset: 'Money Market Funds', percentage: 15, color: COLORS[3] },
        ],
        historicalData: [
          { year: 2020, value: 10000 },
          { year: 2021, value: 10450 },
          { year: 2022, value: 10920 },
          { year: 2023, value: 11410 },
          { year: 2024, value: 11920 },
          { year: 2025, value: 12450 },
        ],
        metrics: {
          expenseRatio: '0.15%',
          minInvestment: '$1,000',
          taxEfficiency: 'High',
        },
      },
      medium: {
        id: 'balanced',
        name: 'Balanced Growth Strategy',
        risk: 'Moderate',
        description: 'A well-diversified approach balancing growth and income. Suitable for investors with moderate risk tolerance and long-term goals.',
        expectedReturn: '7-9% annually',
        allocation: [
          { asset: 'Large-Cap U.S. Equities', percentage: 35, color: COLORS[0] },
          { asset: 'International Developed Markets', percentage: 20, color: COLORS[1] },
          { asset: 'Intermediate-Term Bonds', percentage: 25, color: COLORS[2] },
          { asset: 'Real Estate Investment Trusts', percentage: 10, color: COLORS[4] },
          { asset: 'Cash & Short-Term Instruments', percentage: 10, color: COLORS[3] },
        ],
        historicalData: [
          { year: 2020, value: 10000 },
          { year: 2021, value: 10720 },
          { year: 2022, value: 11490 },
          { year: 2023, value: 12320 },
          { year: 2024, value: 13210 },
          { year: 2025, value: 14160 },
        ],
        metrics: {
          expenseRatio: '0.22%',
          minInvestment: '$500',
          taxEfficiency: 'Medium',
        },
      },
      high: {
        id: 'aggressive',
        name: 'Aggressive Growth Strategy',
        risk: 'Aggressive',
        description: 'Maximize long-term growth potential through concentrated positions in high-growth sectors. Best for investors with long time horizons and high risk tolerance.',
        expectedReturn: '10-15% annually',
        allocation: [
          { asset: 'Technology & Innovation', percentage: 40, color: COLORS[0] },
          { asset: 'Emerging Markets', percentage: 20, color: COLORS[1] },
          { asset: 'Small-Cap Growth', percentage: 20, color: COLORS[2] },
          { asset: 'Alternative Investments', percentage: 10, color: COLORS[7] },
          { asset: 'Cash & Derivatives', percentage: 10, color: COLORS[3] },
        ],
        historicalData: [
          { year: 2020, value: 10000 },
          { year: 2021, value: 11200 },
          { year: 2022, value: 12540 },
          { year: 2023, value: 14050 },
          { year: 2024, value: 15740 },
          { year: 2025, value: 17630 },
        ],
        metrics: {
          expenseRatio: '0.35%',
          minInvestment: '$250',
          taxEfficiency: 'Low',
        },
      },
    }

    return strategies[riskTolerance]
  }

  const strategy = showResult ? generateStrategy() : null

  const trustBadges = [
    { icon: <Building2 className="w-6 h-6" />, text: 'Institutional Grade' },
    { icon: <Shield className="w-6 h-6" />, text: 'SEC Registered' },
    { icon: <Lock className="w-6 h-6" />, text: 'Bank-Level Security' },
    { icon: <Award className="w-6 h-6" />, text: 'Award-Winning Platform' },
  ]

  const valueProps = [
    { value: '$0', label: 'Account Fees', description: 'No maintenance or account minimum fees' },
    { value: '0.15%', label: 'Average Expense Ratio', description: 'Well below industry average of 0.44%' },
    { value: '$1', label: 'Minimum Investment', description: 'Start investing with any amount' },
    { value: '276/326', label: 'Funds Outperform', description: 'Beat peer-group averages over 10 years' },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463]/5 via-transparent to-[#034732]/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C4A77D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0A2463]/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className={`border-b border-white/6 sticky top-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'glass-dark' : 'bg-[#0a0a0a]/80 backdrop-blur-lg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className={`flex items-center space-x-3 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A2463] to-[#034732] rounded-xl flex items-center justify-center shadow-lg pulse-glow">
                <TrendingUp className="w-7 h-7 text-[#C4A77D]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">InvestIQ</h1>
                <p className="text-xs text-gray-400 tracking-wide">PROFESSIONAL INVESTMENT MANAGEMENT</p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-10">
              {['Why InvestIQ', 'Investment Options', 'Pricing & Fees', 'Resource Center'].map((item, index) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-sm font-medium text-gray-300 hover:text-[#C4A77D] transition-colors relative group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C4A77D] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
            <button className="bg-gradient-to-r from-[#0A2463] to-[#034732] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:shadow-[#C4A77D]/10 transition-all duration-300 border border-[#C4A77D]/20">
              Open an Account
            </button>
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <section className="border-b border-white/6 py-5 bg-[#0a0a0a]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-12 md:space-x-20">
            {trustBadges.map((badge, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-2 text-gray-400 hover:text-[#C4A77D] transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-[#C4A77D]">{badge.icon}</div>
                <span className="text-sm font-medium hidden md:inline">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center space-x-2 bg-[#C4A77D]/10 border border-[#C4A77D]/20 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-[#C4A77D]" />
              <span className="text-sm font-semibold text-[#C4A77D]">Get $0 commission trades + $0 account fees</span>
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Invest smart<br />
            <span className="gradient-text">from the start</span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Low costs, expert guidance, and a clear path to your financial goals. 
            Join millions of investors who trust InvestIQ for their financial future.
          </p>

          {/* Value Props */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {valueProps.map((prop, index) => (
              <div 
                key={index} 
                className="group text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C4A77D]/30 hover:bg-white/10 transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#C4A77D] mb-2 group-hover:scale-110 transition-transform duration-300">{prop.value}</div>
                <div className="text-sm font-semibold text-white mb-1">{prop.label}</div>
                <div className="text-xs text-gray-500">{prop.description}</div>
              </div>
            ))}
          </div>

          <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="w-full sm:w-auto bg-gradient-to-r from-[#C4A77D] to-[#d4b78d] text-[#0a0a0a] px-10 py-5 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-[#C4A77D]/20 transition-all duration-300 transform hover:-translate-y-1">
              Open an Account
            </button>
            <button className="w-full sm:w-auto group border-2 border-[#C4A77D]/30 text-[#C4A77D] px-10 py-5 rounded-xl text-lg font-semibold hover:bg-[#C4A77D]/10 transition-all duration-300 flex items-center justify-center space-x-3">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Investment Calculator */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#141414]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find the right<br />
              <span className="gradient-text">investment strategy</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Answer a few questions to get a personalized investment recommendation
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-xl">
            {/* Risk Tolerance */}
            <div className="mb-10">
              <label className="flex items-center space-x-3 text-xl font-bold text-white mb-6">
                <Shield className="w-7 h-7 text-[#C4A77D]" />
                <span>What's your risk tolerance?</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setRiskTolerance(level)}
                    className={`group p-6 rounded-xl font-semibold transition-all duration-300 ${
                      riskTolerance === level
                        ? 'bg-gradient-to-br from-[#C4A77D] to-[#d4b78d] text-[#0a0a0a] shadow-xl shadow-[#C4A77D]/20 scale-105'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:border-[#C4A77D]/30 border border-white/10'
                    }`}
                  >
                    <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
                      {level === 'low' && '🛡️'}
                      {level === 'medium' && '⚖️'}
                      {level === 'high' && '🚀'}
                    </div>
                    <div className="capitalize text-lg">{level}</div>
                    <div className="text-xs mt-2 opacity-75">
                      {level === 'low' && 'Preserve capital'}
                      {level === 'medium' && 'Balance growth'}
                      {level === 'high' && 'Maximize returns'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Amount */}
            <div className="mb-10">
              <label className="flex items-center space-x-3 text-xl font-bold text-white mb-6">
                <DollarSign className="w-7 h-7 text-[#C4A77D]" />
                <span>How much would you like to invest?</span>
              </label>
              <div className="relative max-w-md">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl font-bold">$</span>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="w-full pl-14 pr-5 py-5 rounded-xl border-2 border-white/10 bg-white/5 text-2xl font-bold text-white focus:ring-2 focus:ring-[#C4A77D] focus:border-[#C4A77D] transition-all duration-300"
                  placeholder="10,000"
                />
              </div>
            </div>

            {/* Time Horizon */}
            <div className="mb-10">
              <label className="flex items-center space-x-3 text-xl font-bold text-white mb-6">
                <Clock className="w-7 h-7 text-[#C4A77D]" />
                <span>What's your investment timeline?</span>
              </label>
              <div className="relative max-w-md">
                <input
                  type="number"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(e.target.value)}
                  className="w-full px-5 py-5 rounded-xl border-2 border-white/10 bg-white/5 text-2xl font-bold text-white focus:ring-2 focus:ring-[#C4A77D] focus:border-[#C4A77D] transition-all duration-300"
                  placeholder="5"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">years</span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={() => {
                setShowResult(true)
                setTimeout(() => {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                }, 100)
              }}
              className="w-full bg-gradient-to-r from-[#0A2463] to-[#034732] text-white py-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#C4A77D]/10 transition-all duration-300 flex items-center justify-center space-x-3 transform hover:-translate-y-1 group"
            >
              <BarChart3 className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
              <span>Generate Investment Strategy</span>
            </button>
          </div>
        </div>
      </section>

      {/* Strategy Results */}
      {showResult && strategy && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl scale-in">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0A2463] to-[#034732] p-10 md:p-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-5">
                    <CheckCircle2 className="w-10 h-10 text-[#C4A77D]" />
                    <span className="bg-[#C4A77D]/20 backdrop-blur-sm px-5 py-2 rounded-full text-[#C4A77D] text-sm font-semibold border border-[#C4A77D]/30">
                      Strategy Recommendation
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-5">{strategy.name}</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`px-5 py-2 rounded-full text-base font-bold ${
                      strategy.risk === 'Conservative' ? 'bg-emerald-600' :
                      strategy.risk === 'Moderate' ? 'bg-amber-600' :
                      'bg-red-600'
                    } text-white shadow-lg`}>
                      {strategy.risk} Risk
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-white border border-white/20">
                      Expected Return: <strong className="text-[#C4A77D]">{strategy.expectedReturn}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 md:p-14">
                <p className="text-gray-300 text-lg mb-12 leading-relaxed">
                  {strategy.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { icon: <Percent className="w-6 h-6" />, label: 'Expense Ratio', value: strategy.metrics.expenseRatio },
                    { icon: <DollarSign className="w-6 h-6" />, label: 'Minimum Investment', value: strategy.metrics.minInvestment },
                    { icon: <Award className="w-6 h-6" />, label: 'Tax Efficiency', value: strategy.metrics.taxEfficiency },
                  ].map((metric, index) => (
                    <div 
                      key={index} 
                      className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#C4A77D]/30 transition-all duration-300 card-hover"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="text-[#C4A77D]">{metric.icon}</div>
                        <div className="text-sm font-semibold text-gray-400">{metric.label}</div>
                      </div>
                      <div className="text-3xl font-bold text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-10 mb-12">
                  {/* Allocation Chart */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <LineChartIcon className="w-7 h-7 mr-3 text-[#C4A77D]" />
                      Asset Allocation
                    </h4>
                    <ResponsiveContainer width="100%" height={320}>
                      <RechartsPieChart>
                        <Pie
                          data={strategy.allocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry: any) => `${entry.percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="percentage"
                          animationBegin={0}
                          animationDuration={1500}
                        >
                          {strategy.allocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                          }}
                        />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Growth Chart */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <TrendingUp className="w-7 h-7 mr-3 text-[#C4A77D]" />
                      Projected Growth
                    </h4>
                    <ResponsiveContainer width="100%" height={320}>
                      <AreaChart data={strategy.historicalData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                        <XAxis dataKey="year" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                          }}
                          formatter={(value: any) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#C4A77D"
                          fill="#C4A77D"
                          fillOpacity={0.3}
                          strokeWidth={2}
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                  <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <DollarSign className="w-8 h-8 mr-3 text-[#C4A77D]" />
                    Your Investment Breakdown
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {strategy.allocation.map((item, index) => {
                      const amount = (parseInt(investmentAmount) * item.percentage) / 100
                      return (
                        <div 
                          key={item.asset} 
                          className="bg-[#0a0a0a]/50 rounded-xl p-6 border border-white/10 hover:border-[#C4A77D]/30 transition-all duration-300 card-hover"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 text-sm font-medium">{item.asset}</span>
                            <div className="w-5 h-5 rounded-full shadow-lg" style={{ backgroundColor: item.color }} />
                          </div>
                          <div className="text-3xl font-bold text-white mb-2">
                            ${amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500 mb-4">{item.percentage}% of portfolio</div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 shadow-lg"
                              style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-10 p-6 bg-[#C4A77D]/10 border border-[#C4A77D]/20 rounded-xl">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <strong className="text-[#C4A77D]">Important:</strong> This is a simulated investment strategy for demonstration purposes only.
                    Not actual financial advice. Past performance does not guarantee future results. 
                    Please consult a licensed financial advisor before making investment decisions. 
                    All investments involve risk, including the possible loss of principal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#141414] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why choose<br />
              <span className="gradient-text">InvestIQ?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our objective insights and disciplined approach have helped generations of customers through all kinds of markets.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'A clear, straightforward experience',
                description: 'Easy-to-use tools and resources to help you make informed investment decisions.',
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: 'Guidance as life changes',
                description: 'Personalized advice and support to help you navigate life financial milestones.',
              },
              {
                icon: <Building2 className="w-10 h-10" />,
                title: 'Integrated tools and products',
                description: 'A comprehensive suite of investment products to meet your diverse needs.',
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: 'Value and transparency',
                description: 'Low costs and clear pricing so you keep more of what you earn.',
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-[#C4A77D]/30 transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-[#C4A77D] mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/6 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0A2463] to-[#034732] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-[#C4A77D]" />
                </div>
                <span className="text-2xl font-bold">InvestIQ</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional investment management for everyone. Low costs, expert guidance, and a clear path to your financial goals.
              </p>
            </div>
            {[
              {
                title: 'Products',
                links: ['Brokerage Accounts', 'IRAs', '529 Plans', 'Health Savings Accounts'],
              },
              {
                title: 'Guidance & Research',
                links: ['Financial Planning', 'Market Insights', 'Retirement Resources', 'Educational Content'],
              },
              {
                title: 'About',
                links: ['Our Company', 'Careers', 'Press Room', 'Contact Us'],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-bold mb-6 text-[#C4A77D]">{column.title}</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-[#C4A77D] transition-colors duration-300">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/6 pt-10">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © 2026 InvestIQ. All rights reserved. Demo for testing purposes.
              </p>
              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <a href="#" className="hover:text-[#C4A77D] transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-[#C4A77D] transition-colors duration-300">Terms of Use</a>
                <a href="#" className="hover:text-[#C4A77D] transition-colors duration-300">Disclosures</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
