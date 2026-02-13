"use client"

import { supabase } from '@/lib/supabase'

export default function Navbar({ user }: { user: any }) {

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.reload()
    }

    return (
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
                Smart <span className="text-blue-400">Bookmarks</span>
            </h1>

            {user && (
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-400 hidden sm:block">{user.email}</p>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition text-white font-medium"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
