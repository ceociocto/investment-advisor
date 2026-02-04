import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InvestIQ - AI Investment Strategy Advisor',
  description: 'Get personalized investment strategies powered by AI analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
