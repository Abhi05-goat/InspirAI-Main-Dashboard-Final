export const dashboardData = {
  motivation:
    "I want to build an AI-powered adaptive learning platform that helps students succeed by personalizing their study experience based on their energy, mood, and learning patterns.",

  raw_idea:
    "Create a cross-platform AI planner that unifies syllabus, calendar, and energy data from multiple sources, with offline-first capabilities for low-resource settings. The platform should integrate with existing LMS systems and provide real-time engagement analytics.",

  Groq_PS_output: {
    title: "Adaptive AI Learning Companion",
    summary:
      "An intelligent study assistant that combines academic planning with well-being tracking, offering personalized micro-rewards and focus timers tailored to individual motivation drivers.",
    problem_statement:
      "Students struggle with inconsistent study habits and lack personalized support that accounts for their energy levels, mood, and individual learning preferences. Existing tools are fragmented and don't provide holistic support.",
    proposed_solution:
      "Build a unified platform that integrates academic planning, real-time engagement analytics, and well-being tracking. Use AI to provide adaptive recommendations, personalized rewards, and context-aware interventions.",
    confidence_score: 8,
    confidence_reason:
      "Strong market demand for personalized learning tools, proven success of similar platforms like Engageli, clear differentiation through well-being integration, and multiple revenue opportunities.",
    analysis: {
      Engageli: {
        pros: [
          "Pro1: Real-time engagement tracking and adaptive interventions boost consistency.",
          "Pro2: AI-generated summaries and feedback support missed session recovery.",
          "Pro3: Scalable for large, diverse cohorts.",
        ],
        cons: [
          "Con1: Primarily designed for higher education and live sessions.",
          "Con2: Integration with non-Engageli platforms may be limited.",
        ],
        opportunity:
          "Young builders can create lightweight, Engageli-inspired engagement analytics for smaller or low-resource study groups.",
      },
      SchoolAI: {
        pros: [
          "Pro1: Comprehensive AI tutoring and personalized learning paths.",
          "Pro2: Integration with school management systems.",
          "Pro3: Real-time progress tracking and parent notifications.",
        ],
        cons: [
          "Con1: High implementation costs for schools.",
          "Con2: Limited customization for non-traditional learning environments.",
        ],
        opportunity:
          "Build affordable, modular AI tutoring tools for independent learners and homeschooling communities.",
      },
      Coursera: {
        pros: [
          "Pro1: Massive course library and global reach.",
          "Pro2: Strong brand recognition and learner trust.",
          "Pro3: Flexible learning paths and professional credentials.",
        ],
        cons: [
          "Con1: Limited personalization based on individual energy and mood.",
          "Con2: High cost for premium features may exclude low-income students.",
        ],
        opportunity:
          "Build a complementary tool that adds well-being tracking and adaptive scheduling to Coursera courses, targeting underserved student populations.",
      },
      "Google Gemini": {
        pros: [
          "Pro1: Seamless integration with widely used Google tools.",
          "Pro2: Strong privacy and admin controls.",
          "Pro3: Free for most users, lowering barriers to entry.",
        ],
        cons: [
          "Con1: Deepest features require Google ecosystem lock-in.",
          "Con2: Customization beyond templates may be limited.",
        ],
        opportunity:
          "Developers can build add-ons or bridges to extend Gemini's adaptive planning to non-Google platforms or specialized student needs.",
      },
      Duolingo: {
        pros: [
          "Pro1: Highly engaging gamification with streaks and rewards.",
          "Pro2: Mobile-first design with excellent UX.",
          "Pro3: Proven ability to drive habit formation through micro-learning.",
        ],
        cons: [
          "Con1: Limited to language learning, not applicable to broader academic planning.",
          "Con2: Gamification may not suit all learning styles or cultural contexts.",
        ],
        opportunity:
          "Adapt Duolingo's gamification mechanics to academic planning, creating culturally adaptive reward systems for diverse student populations.",
      },
      "Khan Academy": {
        pros: [
          "Pro1: Free, high-quality educational content.",
          "Pro2: Strong focus on foundational skills and mastery-based learning.",
          "Pro3: Trusted by educators and widely used in schools.",
        ],
        cons: [
          "Con1: Limited personalization based on student energy and mood.",
          "Con2: Lacks integration with student calendars and scheduling tools.",
        ],
        opportunity:
          "Build a scheduling and well-being layer on top of Khan Academy content, helping students optimize when and how they engage with lessons.",
      },
    },
    niche_identification: [
      "Niche1: Build a cross-platform AI planner that unifies syllabus, calendar, and energy data from multiple sources, with offline-first capabilities for low-resource settings.",
      "Niche2: Develop a plug-in for existing LMS or calendar apps that adds adaptive micro-rewards and focus timers tailored to individual motivation drivers.",
      "Niche3: Create a lightweight, privacy-first engagement analytics tool for peer study groups or after-school programs, inspired by Engageli but open-source.",
      "Niche4: Prototype a conversational AI companion that integrates academic planning with well-being tracking (energy, mood, social check-ins) for holistic support.",
      "Niche5: Design a no-code builder for teachers and students to create custom adaptive study workflows, lowering the barrier for non-technical users.",
      "Niche6: Launch a culturally adaptive gamification layer that personalizes rewards and motivation strategies based on student background and preferences.",
    ],
  },

  Perplexity_trend_output_raw: {
    trends: [
      "Trend1: Deep personalization—AI tools now adapt not just to academic needs but also to student energy, mood, and engagement patterns.",
      "Trend2: Seamless integration—SOTA tools are embedding directly into existing platforms (e.g., Google Workspace, LMS), reducing friction and boosting adoption.",
      "Trend3: Real-time analytics—Platforms provide instant feedback and intervention triggers for both students and educators, supporting proactive adjustments.",
      "Trend4: Gamification and micro-rewards—Motivational features like focus timers, badges, and streaks are increasingly used to drive consistency.",
      "Trend5: Low-code/no-code customization—Teachers and students can now build or tailor AI experiences without technical expertise, opening new niches for young developers.",
    ],
    search_citations: [
      "https://www.engageli.com/blog/ai-in-education-statistics",
      "https://today.uconn.edu/2025/07/ai-in-k-12-education-partners-in-progress-not-replacements/",
      "https://ditchthattextbook.com/ai-tools/",
      "https://360learning.com/blog/ai-learning-platforms/",
      "https://pce.sandiego.edu/ai-tools-for-teachers/",
      "https://schoolai.com",
      "https://blog.workday.com/en-us/ai-in-the-classroom-personalized-learning-and-the-future-of-education.html",
      "https://www.cengagegroup.com/news/perspectives/2025/ais-impact-on-education-in-2025/",
      "https://www.ed.gov/sites/ed/files/documents/ai-report/ai-report.pdf",
      "https://www.eklavvya.com/blog/ai-edtech-tools/",
    ],
    sota_tools_snippets: [
      {
        tool_name: "Engageli",
        snippet: {
          definition:
            "Engageli is an AI-powered active learning platform that delivers real-time engagement analytics, personalized feedback, and dynamic interventions for both instructors and students.",
          sota_aspect:
            "It offers real-time engagement insights, AI-driven content creation (auto-segmenting videos into micro-lessons), personalized AI tutors, and instant class summaries, making active learning scalable and highly adaptive as of 2025.",
          working_one_liner:
            "Engageli continuously tracks student engagement and performance, providing AI recommendations and personalized feedback to optimize learning in real time.",
          example_workflow:
            "A student logs in, attends a live or recorded session, and receives instant AI-generated summaries and personalized feedback; missed sessions are summarized and key moments highlighted, while instructors get alerts to intervene if engagement drops.",
        },
      },
      {
        tool_name: "Google Gemini",
        snippet: {
          definition:
            "Google Gemini is a multimodal AI model integrated into Google Workspace and educational tools, enabling adaptive planning and personalized learning experiences.",
          sota_aspect:
            "Gemini excels at understanding context across documents, emails, and calendar data, enabling seamless integration with existing workflows and providing adaptive recommendations without requiring separate logins.",
          working_one_liner:
            "Gemini analyzes your academic calendar, syllabus, and past performance to suggest personalized study schedules and resource recommendations.",
          example_workflow:
            "A student uploads their syllabus to Google Drive; Gemini automatically extracts deadlines, creates a study timeline, and suggests focus areas based on past performance and upcoming exams.",
        },
      },
      {
        tool_name: "Coursera",
        snippet: {
          definition:
            "Coursera is a global online learning platform offering courses from top universities and companies, with AI-powered personalization and adaptive learning paths.",
          sota_aspect:
            "Coursera uses AI to recommend courses, personalize learning sequences, and provide adaptive assessments that adjust difficulty based on learner performance.",
          working_one_liner:
            "Coursera matches learners with courses and provides AI-driven recommendations to optimize learning outcomes and career progression.",
          example_workflow:
            "A student enrolls in a course; Coursera tracks progress, recommends supplementary materials, and suggests related courses based on performance and career goals.",
        },
      },
      {
        tool_name: "Duolingo",
        snippet: {
          definition:
            "Duolingo is a gamified language learning app that uses AI to personalize lessons, track progress, and maintain user engagement through streaks and rewards.",
          sota_aspect:
            "Duolingo's AI adapts lesson difficulty in real-time, personalizes content based on learning style, and uses psychological principles (streaks, notifications, rewards) to drive habit formation.",
          working_one_liner:
            "Duolingo delivers personalized micro-lessons with adaptive difficulty, using gamification to maintain consistent engagement and habit formation.",
          example_workflow:
            "A user completes daily lessons; Duolingo tracks streaks, adjusts difficulty based on performance, sends motivational notifications, and rewards consistency with badges and achievements.",
        },
      },
      {
        tool_name: "Khan Academy",
        snippet: {
          definition:
            "Khan Academy is a free online learning platform offering video lessons, practice exercises, and AI-powered personalization for K-12 and college-level subjects.",
          sota_aspect:
            "Khan Academy uses AI to identify knowledge gaps, recommend targeted practice, and provide teachers with real-time insights into student progress and mastery levels.",
          working_one_liner:
            "Khan Academy delivers personalized learning paths with AI-driven recommendations to help students master foundational skills at their own pace.",
          example_workflow:
            "A student watches a lesson, completes practice problems; Khan Academy identifies gaps, recommends review materials, and tracks mastery progress for teachers.",
        },
      },
    ],
  },
}
