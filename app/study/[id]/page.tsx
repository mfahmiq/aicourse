import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Calendar, Clock, Download, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { StudyMaterial } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

export default async function StudyMaterialPage({
  params,
}: {
  params: { id: string }
}) {
  const { userId } = auth()
  
  if (!userId) {
    redirect("/sign-in")
  }

  // Fetch the specific study material
  const { data: material, error } = await supabase
    .from('study_materials')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single()
  
  if (error || !material) {
    redirect("/dashboard")
  }

  const studyMaterial = material as StudyMaterial

  // Format the content with proper line breaks and styling
  const formattedContent = studyMaterial.content?.split('\n').map((line, index) => {
    // Check if the line is a heading (starts with # or ##)
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(2)}</h1>
    } else if (line.startsWith('## ')) {
      return <h2 key={index} className="text-xl font-semibold mt-5 mb-2">{line.substring(3)}</h2>
    } else if (line.startsWith('### ')) {
      return <h3 key={index} className="text-lg font-medium mt-4 mb-2">{line.substring(4)}</h3>
    } else if (line.startsWith('- ')) {
      return <li key={index} className="ml-6 list-disc my-1">{line.substring(2)}</li>
    } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
      return <li key={index} className="ml-6 list-decimal my-1">{line.substring(3)}</li>
    } else if (line.trim() === '') {
      return <br key={index} />
    } else {
      return <p key={index} className="my-2">{line}</p>
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600"></div>
            <span className="text-xl font-bold">Easy Study</span>
          </Link>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </nav>

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="mb-3 text-3xl font-bold text-gray-900">{studyMaterial.title}</h1>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {studyMaterial.type.replace('-', ' ')}
                </span>
                <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
                  {studyMaterial.difficulty}
                </span>
                {studyMaterial.method === "gemini" && (
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    AI Generated
                  </span>
                )}
              </div>
            </div>

            <Card className="mb-8 overflow-hidden border-gray-200 p-6 shadow-sm">
              <div className="prose max-w-none text-gray-700">
                {formattedContent}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="border-gray-200 p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">Study Material Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Created {formatDistanceToNow(new Date(studyMaterial.created_at), { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Estimated reading time: {Math.max(1, Math.ceil((studyMaterial.content?.length || 0) / 1500))} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>Difficulty: {studyMaterial.difficulty}</span>
                  </div>
                </div>
              </Card>

              <Card className="border-gray-200 p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </Card>

              <Card className="border-gray-200 bg-blue-50 p-4 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">Need more materials?</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Create more personalized study materials with our AI-powered generator.
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/create">Create New Material</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}