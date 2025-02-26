import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-600"></div>
          <span className="text-xl font-bold">Easy Study</span>
        </div>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          Sign Up
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="container relative mx-auto px-4 py-20 text-center">
        {/* Decorative Images */}
        <div className="absolute left-10 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="flex items-center gap-2">
            <div className="relative h-32 w-32">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Books and apple"
                width={128}
                height={128}
                className="opacity-0"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-end gap-1">
                    <div className="h-16 w-3 rounded bg-blue-600"></div>
                    <div className="h-12 w-3 rounded bg-blue-500"></div>
                    <div className="h-14 w-3 rounded bg-blue-400"></div>
                  </div>
                  <div className="mt-2 h-5 w-5 rounded-full bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-32 w-32 rounded-xl bg-slate-900 p-4">
            <div className="flex flex-col gap-2">
              <div className="h-2 w-16 rounded bg-blue-500"></div>
              <div className="h-2 w-12 rounded bg-green-500"></div>
              <div className="h-2 w-14 rounded bg-purple-500"></div>
              <div className="h-2 w-10 rounded bg-yellow-500"></div>
            </div>
            <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded bg-slate-800">
              <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span>AI-Powered </span>
            <span className="text-blue-600">Exam Prep</span>
            <br />
            <span className="text-blue-600">Material Generator</span>
          </h1>
          <p className="mb-12 text-xl text-muted-foreground">
            Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

