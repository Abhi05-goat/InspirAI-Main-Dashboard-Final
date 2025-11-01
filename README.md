# 🚀 InspirAI - AI-Powered Business Ideation Platform

Transform any business idea into comprehensive market analysis in under 50 seconds. Built for student entrepreneurs and young builders navigating the AI-first world.

## ✨ Features

- **🤖 AI-Powered Analysis**: Groq refines your idea and identifies problem-solution fit
- **🔍 Real-Time Market Research**: Perplexity finds SOTA competitors and emerging trends
- **📊 Comprehensive Dashboard**: Complete analysis with confidence scores, market gaps, and actionable niches
- **💬 Smart Chatbot**: Context-aware AI assistant for personalized guidance
- **⚡ Lightning Fast**: Complete analysis in 50 seconds
- **🎯 Niche Discovery**: Reveals actionable opportunities for young builders

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, n8n Workflows
- **Database**: Supabase (PostgreSQL)
- **AI Services**: Groq API, Perplexity API
- **Deployment**: Vercel (Frontend), n8n Cloud (Workflows)

## 📁 Project Structure

```
InspirAI-Dashboard/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # Groq-powered chatbot API
│   │   ├── dashboard/
│   │   │   └── route.ts          # Dashboard data API
│   │   └── submit/
│   │       └── route.ts          # Form submission to n8n
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard page
│   ├── form/
│   │   └── page.tsx              # Idea submission form
│   ├── processing/
│   │   └── page.tsx              # Processing status page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage (form)
├── components/
│   ├── form/
│   │   └── idea-form.tsx         # Main form component
│   ├── business-niches.tsx       # Business niches display
│   ├── chatbot-panel.tsx         # AI chatbot interface
│   ├── competitor-analysis.tsx   # Competitor analysis section
│   ├── confidence-score.tsx      # Confidence score display
│   ├── header.tsx                # Site header
│   ├── motivation-callout.tsx    # Motivation section
│   ├── original-idea.tsx         # Original idea display
│   ├── problem-solution.tsx      # Problem-solution analysis
│   ├── refined-idea.tsx          # AI-refined idea display
│   ├── search-citations.tsx      # Research citations
│   └── trends-section.tsx        # Market trends display
├── lib/
│   ├── api-client.ts             # API client functions
│   └── supabase-client.ts        # Supabase configuration
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind CSS config
└── tsconfig.json                 # TypeScript config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Groq API key
- n8n Cloud account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhi05-goat/InspirAI-Main-Dashboard-Final.git
   cd InspirAI-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Set up Supabase Database**
   Create a table called `ideas` with the following structure:
   ```sql
   CREATE TABLE ideas (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     email TEXT NOT NULL,
     domain TEXT,
     motivation TEXT,
     raw_idea TEXT,
     confidence INTEGER,
     consent BOOLEAN,
     attachments JSONB,
     Groq_PS_output JSONB,
     Groq_PS_raw TEXT,
     Perplexity_trend_output JSONB,
     Perplexity_trend_output_raw TEXT,
     visualization_code TEXT,
     search_citations TEXT[]
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔄 Workflow Architecture

InspirAI uses a sophisticated AI workflow to process business ideas:

1. **Form Submission** → User submits idea via custom form
2. **n8n Processing** → Automated workflow triggers:
   - **Groq Analysis**: Refines idea, identifies problems/solutions
   - **Supabase Insert**: Creates initial database record
   - **Perplexity Research**: Analyzes SOTA competitors and trends
   - **Database Update**: Adds research data to record
3. **Dashboard Display** → Real-time results with AI chatbot

## 🌐 Live Demo

**Try InspirAI:** [Your Deployed URL]

*Note: Each email address gets one comprehensive analysis for free.*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** for lightning-fast AI inference
- **Perplexity** for real-time market research capabilities
- **Supabase** for seamless database management
- **n8n** for powerful workflow automation
- **Vercel** for effortless deployment

## 📧 Contact

**Abhivanth Sivaprakash** - [asivaprakash23@gmail.com]

Project Link: [https://github.com/Abhi05-goat/InspirAI-Main-Dashboard-Final](https://github.com/Abhi05-goat/InspirAI-Main-Dashboard-Final)

---

**Built with ❤️ for the next generation of entrepreneurs**
