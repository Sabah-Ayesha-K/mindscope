# 🧠 MindScope – AI Mental Health Chatbot

## 📌 Overview

MindScope is a full-stack AI-powered mental health support application that enables users to interact with a conversational assistant, take psychological assessments, and track their emotional well-being over time.

The application integrates **Gemini 2.5** for generating intelligent responses and uses Supabase for backend services including authentication and database management.

---

## 🚀 Features

* 💬 **AI Chat Interface**

  * Real-time conversational chatbot powered by Gemini 2.5
  * Persistent chat history with conversation tracking

* 🧪 **Mental Health Assessments**

  * Stress, Anxiety, Depression, MBTI, and EQ tests
  * Structured questionnaire flow with progress tracking

* 📊 **Dashboard & Results**

  * View past assessments and insights
  * Track mental health trends over time

* 🔐 **Authentication**

  * Secure login/signup using Supabase Auth

* ⚠️ **Safety & Consent**

  * User consent system before accessing the app
  * Emergency mental health resources displayed

---

## 🏗️ Tech Stack

### Frontend

* React (TypeScript)
* Vite
* Tailwind CSS
* React Router

### Backend

* Supabase (Auth + PostgreSQL + Edge Functions)

### AI Integration

* Gemini 2.5 (via backend API)

### Other Libraries

* TanStack React Query
* Lucide Icons

---

## 🧠 How It Works

1. User logs in and accepts consent
2. A conversation session is created
3. First-time users are shown a welcome dialog with guidance on how to use the application effectively
4. User sends a message via chat UI
5. Message is stored in database
6. Backend function sends request to Gemini 2.5
7. AI response is returned and displayed
8. Conversation history is updated

---

## 🔧 Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/mindscope.git
cd mindscope
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file in root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the application

```
npm run dev
```

---


## ⚠️ Disclaimer

MindScope is a mental health support and screening tool and is **not a substitute for professional medical advice, diagnosis, or treatment**. In case of emergency, users are advised to contact local emergency services or mental health helplines.

---


## 🚀 Future Improvements

* Mood trend visualization
* AI-based personalized recommendations
* Backend migration to custom API (FastAPI / Node.js)
* Real-time chat streaming
* Advanced safety filtering

---


## ⭐ Acknowledgements

* Google Gemini (LLM)
* Supabase
* React & Vite ecosystem
