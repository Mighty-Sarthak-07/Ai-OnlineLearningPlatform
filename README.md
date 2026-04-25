<div align="center">
  
# 🎓 SkillWorld
### AI-Based Learning & Syllabus Planning Platform

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11+-blueviolet?style=for-the-badge&logo=framer&logoColor=white)

</div>

**SkillWorld** is an advanced, AI-powered online learning platform designed to streamline course creation, management, and student success. From automated course content generation to AI syllabus planning, SkillWorld acts as your completely personalized digital tutor and planner.

---

## 🌟 Key Features

### 🤖 AI-Powered Content & Planning
- **Automatic Course Content Generation**: Leveraging Gemini AI, simply input a topic and SkillWorld auto-generates structured chapters!
- **AI Syllabus Planner**: Includes a "Let AI plan my schedule" feature. The AI analyzes course structures/deadlines and produces 5-10 actionable steps across your active timeline.

### ✅ Modern Task Management
- **Interactive Task Window**: Draggable, glassmorphism-styled floating window accessible globally across the platform.
- **Full CRUD Capabilities**: Add, edit, delete, and toggle task status. Track pending counts, prioritize tasks, and highlight overdue responsibilities.

### 🎨 Beautiful, Modern UI
- **Premium Themes**: Full Dark / Light mode capabilities and vibrant gradients powered by Tailwind CSS.
- **Silky Smooth Animations**: Powered by `framer-motion` for a responsive, live-feeling user experience.
- **Smart Notifications**: Dropdown notification panel tracking unread activities with complete mark-as-read/clear functionalities.

### 🔐 Secure & Integrated
- **Robust Authentication**: Secured seamlessly through global authentication providers.
- **Persistent Data**: Hybrid LocalStorage for blazing-fast cached tasks and PostgreSQL for permanent application state holding.

---

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, Class Variance Authority (CVA), Lucide React (Icons)
- **Animation**: Framer Motion
- **State Management & Caching**: React Context (`UserdetailsContext`, `TaskContext`, `NotificationContext`)
- **Backend & Integrations**: 
  - Next.js Edge API Routes
  - Google Gemini API (Course Generation)
  - YouTube API Integrations
  - PostgreSQL Database
- **Authentication**: Clerk

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if not already local):
   ```bash
   git clone <your-repository-url>
   cd onlinelearningplatform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *or*
   ```bash
   yarn install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` or `.env` file in the root directory and ensure all dependent API keys and Database connections are included:
   ```env
   # Example required fields
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   GEMINI_API_KEY=...
   DATABASE_URL=...
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to experience SkillWorld.

---

## 💡 Future Roadmap & Development
- [ ] Implement group discussion channels for enrolled courses.
- [ ] Expand AI generation to include automatic flashcards and quizzes at the end of each chapter.
- [ ] Gamification integrations (Leaderboards, XP tracking for chapters completed).

> Designed and built with a focus on **Premium Visual Excellence** and **Interactive User Experiences**.
