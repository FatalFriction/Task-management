# 🚀 Taskify – Team Task Management & Collaboration App

Taskify is a modern, real-time task management web application built with **Next.js**, designed for teams to track work, manage progress, collaborate, and maintain a complete audit trail.  
Think of a **flexible, customizable Kanban board** with screenshots, activity logs, team permissions, and real-time updates.

## ✨ Features

### 🗂 Kanban Board System
- Create and manage unlimited boards
- Drag-and-drop tasks with `@hello-pangea/dnd`
- Customizable lists and cards
- Subtasks, descriptions, attachments

### 🔄 Real-Time Collaboration
- Instant updates via **Pusher**
- Multiple users see changes live

### 📸 Attach Screenshots / Progress Images
- Upload screenshots or files
- Stored securely in **Firebase Storage**

### 🔐 Authentication & Organization Management
- Enterprise-level auth with **Clerk**
- User accounts, roles, teams, and organizations
- Protected routes and actions

### 📝 Audit Logging System
- Every action logged via **Upstash Redis**
- Supervisors/leads can review activity history

### 🗃 Database & Backend
- **MySQL / MariaDB (Hostinger)**
- Prisma ORM
- Firebase Storage
- Upstash Redis (Audit logs)
- Pusher (real-time updates)

### 🎨 UI & UX
- Built with **Tailwind CSS**
- Radix UI components
- Beautiful toasts via Sonner
- Unsplash integration for board cover images

## 🛠 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Radix UI
- Zustand
- TanStack React Query

### Backend
- MySQL / MariaDB (Hostinger)
- Prisma ORM
- Firebase Storage
- Upstash Redis (Audit logs)
- Pusher (real-time updates)

### Utilities
- date-fns
- lodash
- Unsplash API
- zod (validation)

## 📦 Installation

Clone the project:

```bash
git clone <your-repo-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

## ⚙️ Environment Variables

Create a `.env` file and add the following:

```env
# Database
DATABASE_URL="mysql://USER:PASS@HOST:3306/DB_NAME"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Firebase
NEXT_PUBLIC_FBASE_API_KEY=
NEXT_PUBLIC_FBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FBASE_PROJECT_ID=
NEXT_PUBLIC_FBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FBASE_APP_ID=
NEXT_PUBLIC_FBASE_MEASUREMENT_ID=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_UPSTASH_REDIS_REST_URL=
NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN=

# Pusher
NEXT_PUBLIC_APP_ID=
NEXT_PUBLIC_APP_KEY=
NEXT_PUBLIC_SECRET=
NEXT_PUBLIC_APP_CLUSTER=
```

## 🗃 Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run DB migrations (optional):

```bash
npx prisma migrate dev
```

## ▶️ Running the App

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## 🧪 Database Connection Test

Visit:

```
/api/db-test
```

## 📂 Project Structure

```
/app
  /api
  /boards
  layout.tsx
  page.tsx

/components
  Board/
  Card/
  List/
  UI/

/lib
  db.ts
  auth.ts
  create-audit-log.ts

/prisma
  schema.prisma

/public
```

## 🔐 Security

- All environment variables stored outside source control  
- Clerk handles authentication securely  
- Prisma prevents SQL injection  
- Actions restricted server-side  
- Audit logs cannot be deleted or edited  

## 🌐 Deployment

Supported on:

- Hostinger  
- Vercel  
- Railway  
- Render  
- Netlify  
- Any Node.js server  

## Creator
Created With Love 

## 🤝 Contributing

Feel free to open issues or PRs.

## 📄 License

MIT License © 2025
