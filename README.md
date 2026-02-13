# Smart Bookmark App

<div align="center">

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**A modern, real-time bookmark manager built for speed, security, and simplicity.**

</div>

---

## 🚀 Live URL
**[https://smart-bookmark-app.vercel.app](https://smart-bookmark-app.vercel.app)**

## � GitHub Repo
**[https://github.com/Gnaneswar43/smart-bookmark-app](https://github.com/Gnaneswar43/smart-bookmark-app)**

---

## ✨ Features

- **🔐 Google Authentication**: Secure and seamless login via Supabase Auth.
- **🛡️ Row Level Security (RLS)**: Strict data isolation—users can only access their own data.
- **⚡ Real-time Sync**: Instant updates across devices using Supabase Realtime subscriptions.
- **🎨 Modern UI**: Fully responsive, dark-mode design with glassmorphism effects using Tailwind CSS.
- **📱 Responsive**: Optimized for desktop, tablet, and mobile views.

## 🛠 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), React, TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL Database, Auth, Realtime)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🏗 Architecture & Database

The application is built on a serverless architecture.

### Database Schema
A single `bookmarks` table handles the data.

```sql
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  url text not null,
  user_id uuid references auth.users not null default auth.uid()
);
```

### Security (RLS)
Data privacy is enforced at the database level using PostgreSQL Row Level Security policies:
- **SELECT**: `auth.uid() = user_id` (Users see only their own bookmarks)
- **INSERT**: `auth.uid() = user_id` (Users create bookmarks for themselves)
- **DELETE**: `auth.uid() = user_id` (Users delete only their own bookmarks)

---

## � Challenges Faced & Solutions

During development, I encountered several challenges that required debugging and architectural decisions.

### 1. Google OAuth Redirect Issue
- **Problem**: After users authenticated with Google on authentication, the session wasn't persisting correctly, and they were often redirected back to the login screen without a valid session state.
- **Solution**: I updated the `signInWithOAuth` configuration to explicitly include a `redirectTo` URL (`window.location.origin`). I also ensured that the Vercel deployment URL was correctly added to the **Redirect URLs** allowlist in the Supabase Dashboard.

### 2. RLS Policies Returning Empty Data
- **Problem**: Even after successfully inserting data, queries to fetch bookmarks returned an empty array.
- **Solution**: This was due to RLS being enabled but no `SELECT` policy being defined. I wrote a PostgreSQL policy to specifically allow users to select rows where the `user_id` matches their authenticated ID (`auth.uid()`).

### 3. Realtime Updates Not Triggering
- **Problem**: When a bookmark was added, it didn't appear in the list immediately without a manual page refresh.
- **Solution**: I implemented a **Supabase Realtime subscription** in a `useEffect` hook. The app now listens for `postgres_changes` events (INSERT, DELETE) on the `bookmarks` table and triggers a data re-fetch instantly when an event is received.

### 4. Vercel Build Failure (JSON Syntax)
- **Problem**: The deployment to Vercel failed with a generic parser error during the build step.
- **Solution**: Tracing the logs revealed a syntax error in `package.json` (a missing opening bracket). I verified the file structure locally using JSON validation, fixed the syntax error, and the build passed successfully.

---

## 🚀 Future Improvements

- **🔍 Search & Filter**: Add a search bar to filter bookmarks by title or URL.
- **🏷️ Tags System**: Allow users to categorize bookmarks with tags.
- **🖼️ OG Preview**: Automatically fetch and display Open Graph images for saved links.
- **✏️ Edit Functionality**: Enable users to update the title or URL of existing bookmarks.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Gnaneswar43">Gnaneswar Chitekela</a></sub>
</div>
