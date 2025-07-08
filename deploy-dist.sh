#!/bin/bash
# Auto-generated deploy-dist.sh script

echo "🚀 Building project..."
npm run build

echo "📂 Navigating into dist/ folder..."
cd dist

echo "🔃 Initializing git and pushing to gh-pages..."
git init
git add .
git commit -m "Deploy at $(date +'%Y-%m-%d %H:%M:%S')"
git branch -M main
git remote add origin https://github.com/chetan3460/vite-tailwind-starter.git
git push -f origin main:gh-pages

echo "✅ Deployment complete!"
cd ..
