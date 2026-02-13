'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from "@/components/Navbar"
import BookmarkForm from "@/components/BookmarkForm"
import BookmarkCard from "@/components/BookmarkCard"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Get logged in user
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    checkUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // Fetch bookmarks
  useEffect(() => {
    if (user) {
      fetchBookmarks()

      const channel = supabase
        .channel('realtime bookmarks')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'bookmarks' }, (payload) => {
          fetchBookmarks()
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [user])

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setBookmarks(data || [])
    }
  }

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    })
  }

  const handleAdd = async (title: string, url: string) => {
    if (!user) return
    await supabase.from('bookmarks').insert([
      { title, url, user_id: user.id }
    ])
    // Realtime will handle the update
  }

  const handleDelete = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    // Realtime will handle the update
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-gray-500">Loading...</div>
  }

  if (!user) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Smart Bookmarks
        </h1>
        <p className="text-slate-400 text-lg max-w-md">
          Organize your digital life with a modern, secure, and real-time bookmark manager.
        </p>
        <button
          onClick={handleLogin}
          className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition shadow-xl shadow-blue-500/20"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div>
      <Navbar user={user} />

      <BookmarkForm onAdd={handleAdd} />

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-700/50 border-dashed">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">No bookmarks yet</h3>
          <p className="text-slate-400">Add your first bookmark above to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
