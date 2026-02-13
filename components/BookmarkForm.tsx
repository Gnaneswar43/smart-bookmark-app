"use client"

import { useState } from "react"

export default function BookmarkForm({ onAdd }: { onAdd: Function }) {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!title || !url) return
        await onAdd(title, url)
        setTitle("")
        setUrl("")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 mb-8"
        >
            <input
                type="text"
                placeholder="Bookmark Title"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 text-white"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold transition text-white whitespace-nowrap"
            >
                Add Bookmark
            </button>
        </form>
    )
}
