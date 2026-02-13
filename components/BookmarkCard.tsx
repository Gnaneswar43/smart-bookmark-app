export default function BookmarkCard({
    bookmark,
    onDelete,
}: {
    bookmark: any
    onDelete: Function
}) {
    return (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-5 flex justify-between items-center hover:bg-slate-800 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition group">
            <div className="flex-1 min-w-0 mr-4">
                <h3 className="text-lg font-semibold mb-1 text-slate-100 truncate">
                    {bookmark.title}
                </h3>
                <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:text-blue-300 transition truncate block"
                >
                    {bookmark.url}
                </a>
            </div>

            <button
                onClick={() => onDelete(bookmark.id)}
                className="opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 px-4 py-2 rounded-lg text-sm transition font-medium"
            >
                Delete
            </button>
        </div>
    )
}
