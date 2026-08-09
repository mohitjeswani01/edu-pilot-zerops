# **EduPilot** 🚀  

> An AI-powered modern course generation platform built with Next.js (App Router), Drizzle ORM + PostgreSQL, and Gemini AI multi-key rotation.

---

## 🔰 Badges  

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)  
![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)  
![YouTube API](https://img.shields.io/badge/YouTube%20API-Red?style=for-the-badge&logo=youtube&logoColor=white)

---

## 📖 About  
**Edu-Pilot** is a web application designed to simplify online course creation. Users specify a topic, target level, and chapter count, and Edu-Pilot automatically generates structured courses complete with rich HTML content, curated YouTube video embeds, and AI-generated course banners.

---

## ✨ Features  
- 🤖 **Gemini AI Integration**: Multi-key automatic rotation across `GEMINI_API_KEY_1`, `GEMINI_API_KEY_2`, and `GEMINI_API_KEY_3` with rate-limit retry support.
- 🔓 **Open Access Demo**: Open access across all dashboard and learning routes (no sign-in required).
- 📚 **Course Generation & Editing**: Instant AI generation of course structure, chapters, and topic content.
- 📺 **Curated Video Embeds**: Automatic YouTube video recommendations per chapter topic.
- 🖼️ **AI Banner Generation**: Automated course illustration prompt generation and image rendering.
- 📱 **Responsive UI**: Built with Tailwind CSS and Radix UI components.

---

## 🛠️ Tech Stack  
- **Framework**: Next.js 15 (App Router) + React 18
- **Styling**: Tailwind CSS
- **Database & ORM**: Drizzle ORM + PostgreSQL (Neon Database)
- **AI Integration**: Google Gemini API (`@google/generative-ai`)
- **Media Integrations**: YouTube Data API v3 & AI Banner Generation API
- **Access Control**: Open Access Demo Mode

---

## 🚀 Getting Started  

### 1. Clone the repository
```bash
git clone https://github.com/mohitjeswani01/edu-pilot.git
cd edu-pilot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your API keys:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/edupilot
GEMINI_API_KEY_1=your_gemini_api_key_1
GEMINI_API_KEY_2=your_gemini_api_key_2
GEMINI_API_KEY_3=your_gemini_api_key_3
YOUTUBE_API_KEY=your_youtube_api_key
AI_GURU_LAB_API_KEY=your_ai_guru_lab_api_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
