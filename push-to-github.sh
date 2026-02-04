#!/bin/bash
cd /Users/bot/.openclaw/workspace/investment-advisor || exit 1

# Remove old git if any
rm -rf .git

# Initialize new repo
git init

# Add only project files
git add app package.json package-lock.json next.config.js tsconfig.json tailwind.config.ts postcss.config.js wrangler.toml .gitignore README.md SETUP.md

# Commit
git commit -m "Initial commit: Investment Advisor website

- Next.js 14 with App Router
- TypeScript + Tailwind CSS
- Interactive investment strategy generator
- Responsive design with dark mode
- Ready for Cloudflare Pages deployment

Demo for voice modification testing"

# Add remote
git remote add origin https://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@github.com/ceociocto/investment-advisor.git

# Push
git push -u origin main

echo "Done!"
