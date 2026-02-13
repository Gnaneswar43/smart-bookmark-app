# Smart Bookmark App

<div align="center">

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**A modern, real-time bookmark manager built for speed and simplicity.**

[🚀 **Live Demo**](https://smart-bookmark-app.vercel.app) · [🐞 **Report Bug**](https://github.com/Gnaneswar43/smart-bookmark-app/issues)

</div>

---

## ✨ Features

- **🔐 Google Authentication**: Secure and seamless login via Supabase Auth.
- **🛡️ Row Level Security (RLS)**: Private data isolation—users only see their own bookmarks.
- **⚡ Real-time Sync**: Instant updates across all devices using Supabase Realtime.
- **🎨 Modern UI**: Clean, responsive interface with dark mode and glassmorphism effects.
- **📱 Fully Responsive**: Works perfectly on mobile, tablet, and desktop.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Realtime)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gnaneswar43/smart-bookmark-app.git
   cd smart-bookmark-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## 🗄 Database Schema

The app uses a single `bookmarks` table in Supabase.

```sql
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  url text not null,
  user_id uuid references auth.users not null default auth.uid()
);
```

### 🔒 Security Policies (RLS)

We use PostgreSQL Row Level Security to ensure data privacy:

| Policy | Description |
| :--- | :--- |
| **SELECT** | Users can only view their own bookmarks. |
| **INSERT** | Users can only insert bookmarks for themselves. |
| **DELETE** | Users can only delete their own bookmarks. |

---

## 📸 Screenshots

| Landing Page | Dashboard |
| :---: | :---: |
| *(Add screenshot here)* | *(Add screenshot here)* |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Gnaneswar43">Gnaneswar Chitekela</a></sub>
</div>
