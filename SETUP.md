# InspirAI Dashboard - Setup Guide

## Getting Started

This is a production-ready Next.js dashboard built with React and Tailwind CSS. Follow these steps to run it locally and deploy to Vercel.

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Local Development

1. **Clone and Install**
   \`\`\`bash
   git clone <your-repo-url>
   cd inspirai-dashboard
   npm install
   \`\`\`

2. **Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your API keys:
     - **Supabase**: Get from https://supabase.com
     - **Groq**: Get from https://console.groq.com
     - **Perplexity**: Get from https://www.perplexity.ai/

3. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000)

### Deployment to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Click "Deploy"

### API Integration Checklist

- [ ] Supabase setup (database schema for dashboard_ideas table)
- [ ] Groq API key added to environment variables
- [ ] Perplexity API key added to environment variables
- [ ] Implement actual API calls in `/app/api/` routes
- [ ] Test chatbot integration
- [ ] Test data persistence with Supabase

### Project Structure

\`\`\`
inspirai-dashboard/
├── app/
│   ├── api/              # API routes for Groq, Perplexity, Supabase
│   ├── page.tsx          # Main dashboard page
│   └── globals.css       # Global styles and theme
├── components/           # Reusable React components
│   ├── header.tsx
│   ├── motivation-callout.tsx
│   ├── original-idea.tsx
│   ├── refined-idea.tsx
│   ├── confidence-score.tsx
│   ├── problem-solution.tsx
│   ├── trends-section.tsx
│   ├── competitor-analysis.tsx
│   ├── business-niches.tsx
│   ├── visualization-editor.tsx
│   └── chatbot-panel.tsx
├── lib/
│   ├── sample-data.ts    # Sample data (replace with API calls)
│   ├── supabase-client.ts
│   ├── groq-client.ts
│   └── perplexity-client.ts
└── .env.example          # Environment variables template
\`\`\`

### Customization Tips for Beginners

1. **Change Colors**: Edit `app/globals.css` to modify the color theme
2. **Add New Sections**: Create a new component in `components/` and import it in `app/page.tsx`
3. **Modify Sample Data**: Edit `lib/sample-data.ts` to change initial dashboard content
4. **Update API Routes**: Implement actual API calls in `app/api/` routes
5. **Styling**: Use Tailwind CSS classes - all components use semantic tokens like `bg-surface`, `text-foreground`, etc.

### Common Issues

**Issue**: Environment variables not loading
- **Solution**: Restart dev server after adding `.env.local`

**Issue**: Supabase connection failing
- **Solution**: Check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correct

**Issue**: API routes returning 500 errors
- **Solution**: Check server logs and ensure API keys are valid

### Next Steps

1. Implement Supabase database schema
2. Wire up Groq API for idea refinement
3. Connect Perplexity API for trend analysis
4. Build chatbot backend with AI responses
5. Add user authentication
6. Create data export/sharing features

### Support

For issues or questions:
- Check the TODO comments in the code
- Review API documentation for each service
- Open an issue on GitHub
