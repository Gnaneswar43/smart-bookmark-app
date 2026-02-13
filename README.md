# Smart Bookmark App

A modern, full-stack web application aimed at organizing your web resources efficiently. Built with the latest web technologies, this app features secure authentication, real-time data synchronization, and a clean, responsive user interface.

## 🚀 Features

- **Google OAuth Authentication**: Secure and seamless login experience using Google credentials via Supabase Auth.
- **Personalized Bookmarking**: Users can add and manage their own private collection of bookmarks.
- **Row Level Security (RLS)**: Data privacy is enforced at the database level. Users can strictly access only their own data.
- **Real-time Updates**: Changes (additions/deletions) are reflected instantly across all connected devices using Supabase Realtime.
- **Responsive Design**: fully responsive interface built with Tailwind CSS.

## 🛠 Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (Google OAuth)
- **State Management**: React Hooks + Supabase Realtime

## 📦 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/smart-bookmark-app.git
   cd smart-bookmark-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🗄 Database Schema & Security

The application uses a single `bookmarks` table in Supabase.

### Schema
```sql
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  url text not null,
  user_id uuid references auth.users not null default auth.uid()
);
```

### Security Policies (RLS)
Row Level Security is enabled to ensure data isolation:

1. **Enable RLS**:
   ```sql
   alter table bookmarks enable row level security;
   ```

2. **Policies**:
   - **Select**: Users can view their own bookmarks.
   - **Insert**: Users can add bookmarks (automatically assigned to their `user_id`).
   - **Delete**: Users can delete their own bookmarks.

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel Project Settings > Environment Variables.
4. Deploy!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
