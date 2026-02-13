export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 to-black text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10">
          {children}
        </div>
      </body>
    </html>
  )
}
