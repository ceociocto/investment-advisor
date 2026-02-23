# InvestIQ - AI Investment Strategy Advisor

A modern, responsive web application for generating personalized investment strategies using Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Weekly Investment Briefing**: Comprehensive AI & cryptocurrency market analysis with trends and recommendations
- **Interactive Investment Calculator**: Input your investment amount, risk tolerance, and time horizon
- **AI-Powered Strategy Generation**: Get personalized investment recommendations
- **Dynamic Asset Allocation**: Visual breakdown of portfolio distribution
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark mode based on system preferences

## 🎨 Brand Identity

The InvestIQ logo features a modern minimalist design that reflects our AI-powered investment intelligence:

- **Main Logo** (`/logo.svg`) - Primary brand identifier with trending growth chart
- **Hex Logo** (`/logo-hex.svg`) - Dark theme version with geometric hexagon
- **Minimal Logo** (`/logo-minimal.svg`) - Clean design with concentric intelligence waves
- **Horizontal Logo** (`/logo-horizontal.svg`) - Wide format for headers and banners
- **Favicon** (`/favicon.svg`) - Simplified icon for browser tabs and app icons

**Color Palette:**
- Gold: `#C4A77D` → `#8B7355` (wealth, premium quality, success)
- Navy Blue: `#0A2463` → `#1e3a8a` (trust, professionalism, stability)
- Deep Green: `#034732` → `#065f46` (growth, financial success)

For detailed logo usage guidelines and design specifications, see [`public/LOGO_DESIGN.md`](./public/LOGO_DESIGN.md).

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Cloudflare Pages
- **Version Control**: GitHub

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## 🌐 Deployment

### Cloudflare Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
npm run deploy
```

Or use the Cloudflare dashboard:
- Connect your GitHub repository
- Build settings:
  - Build command: `npm run build`
  - Build output directory: `out`

## 💡 Usage

### Investment Calculator

1. Select your risk tolerance (Low, Medium, or High)
2. Enter your investment amount
3. Specify your investment timeline
4. Click "Generate Investment Strategy"
5. View your personalized investment recommendation

### Weekly Investment Briefing

Access the latest AI & cryptocurrency market analysis by visiting `/briefing` or clicking "Weekly Briefing" in the navigation. The briefing includes:

- **Executive Summary**: Key market movements and sentiment
- **AI Market Analysis**: Top performers, trends, and recommendations
- **Crypto Market Analysis**: Bitcoin, altcoins, and DeFi sector insights
- **Risk Factors**: Potential market risks to watch
- **Upcoming Events**: Important market events that may impact investments

For detailed documentation, see [BRIEFING_README.md](./BRIEFING_README.md)

## 📄 License

This project is for demonstration purposes only.

## ⚠️ Disclaimer

**This is a simulated investment service for voice modification testing purposes.**
Not actual financial advice. Please consult a licensed financial advisor before making investment decisions.
