import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs"

export default function Home() {
  const { userId } = auth()
  
  if (userId) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600"></div>
            <span className="text-xl font-bold">Easy Study</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-white py-20">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
                  Create personalized study materials with AI
                </h1>
                <p className="mb-8 text-xl text-gray-600">
                  Easy Study helps you prepare for exams, interviews, and more with AI-generated study materials tailored to your needs.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700" size="lg" asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
              <div className="rounded-lg bg-blue-50 p-8">
                <div className="aspect-video rounded-lg bg-white p-6 shadow-lg">
                  <div className="mb-4 h-8 w-1/2 rounded-full bg-blue-100"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded-full bg-gray-100"></div>
                    <div className="h-4 w-5/6 rounded-full bg-gray-100"></div>
                    <div className="h-4 w-4/6 rounded-full bg-gray-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}