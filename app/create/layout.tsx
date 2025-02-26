import type React from "react"
import Link from "next/link"

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600"></div>
            <span className="text-xl font-bold">Easy Study</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      {children}
    </div>
  )
}

