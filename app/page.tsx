'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  // Get logged in user
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    checkUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // Fetch bookmarks when user is logged in
  useEffect(() => {
    if (user) {
      fetchBookmarks()
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
        redirectTo: 'http://localhost:3000'
      }
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setBookmarks([])
  }

  const addBookmark = async () => {
    if (!title || !url) return

    const { error } = await supabase.from('bookmarks').insert([
      {
        title,
        url,
        // user_id is automatically handled by RLS via auth.uid() if set up correctly, 
        // but passing it explicitly is also fine if the policy allows. 
        // Based on previous context, clear policies might rely on auth.uid().
        // If the table definition requires explicit user_id, we can leave it.
        // Assuming the user wants exactly the code provided:
        user_id: user.id
      }
    ])

    if (error) {
      console.error('Error adding bookmark:', error)
    } else {
      setTitle('')
      setUrl('')
      fetchBookmarks()
    }
  }

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from('bookmarks').delete().eq('id', id)
    if (error) {
      console.error('Error deleting bookmark:', error)
    } else {
      fetchBookmarks()
    }
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Smart Bookmarks</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Bookmark Form */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Title (e.g., My Blog)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-1/3 rounded"
        />
        <input
          type="text"
          placeholder="URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-1/2 rounded"
        />
        <button
          onClick={addBookmark}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Bookmark List */}
      <div className="space-y-3">
        {bookmarks.length === 0 && (
          <p className="text-gray-500 text-center py-4">No bookmarks yet. Add one above!</p>
        )}
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="border p-4 rounded flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">{bookmark.title}</p>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm hover:underline"
              >
                {bookmark.url}
              </a>
            </div>
            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
