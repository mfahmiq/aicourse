import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { RefreshCcw, Laptop } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    title: "Easy Python",
    description: "A concise introduction to Python programming fundamentals.",
    date: "20 Dec 2024",
  },
  {
    title: "ReactJS for Beginners",
    description: "A beginner-friendly introduction to ReactJS, covering the fundamentals of building user interfaces.",
    date: "20 Dec 2024",
  },
  {
    title: "Data Structures and Algorithms (Easy)",
    description: "This course provides a foundational understanding of essential data structures and algorithms.",
    date: "20 Dec 2024",
  },
  {
    title: "Flutter Coding Prep",
    description:
      "This course provides a gentle introduction to Flutter, covering the basics needed to build simple mobile apps.",
    date: "20 Dec 2024",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600"></div>
              <span className="text-xl font-bold">Easy Study</span>
            </div>
          </div>

          {/* Create New Button */}
          <div className="px-4">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/create">+ Create New</Link>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 space-y-1 px-2">
            <Button variant="ghost" className="w-full justify-start gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              Upgrade
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
              Profile
            </Button>
          </nav>

          {/* Credits */}
          <div className="mt-auto p-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 text-sm font-medium text-gray-900">Available Credits: 1</h3>
              <div className="h-2 rounded-full bg-blue-100">
                <div className="h-2 w-4/5 rounded-full bg-blue-600"></div>
              </div>
              <p className="mt-2 text-xs text-gray-600">4 Out of 5 Credits Used</p>
              <Button variant="link" className="mt-1 h-auto p-0 text-xs text-blue-600 hover:text-blue-700">
                Upgrade to create more
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        {/* Welcome Banner */}
        <div className="bg-blue-600 p-8 text-white">
          <div className="flex items-center gap-6">
            <Laptop className="h-16 w-16" />
            <div>
              <h1 className="text-3xl font-bold">Hello, Game Play</h1>
              <p className="mt-1 text-lg text-blue-50">
                Welcome Back, Its time to get back and start learning new course
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Your Study Material</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.title} className="border-gray-100 bg-white shadow-sm">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 p-2">
                    <div className="flex flex-col items-center">
                      <div className="flex items-end gap-0.5">
                        <div className="h-6 w-1.5 rounded bg-blue-600"></div>
                        <div className="h-5 w-1.5 rounded bg-blue-500"></div>
                        <div className="h-4 w-1.5 rounded bg-blue-400"></div>
                      </div>
                      <div className="mt-1 h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <span className="ml-2 shrink-0 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                        {course.date}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{course.description}</p>
                  </div>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button className="ml-auto bg-blue-600 hover:bg-blue-700">View</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

