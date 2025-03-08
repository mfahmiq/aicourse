import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { EditForm } from "./edit-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EditPage({ params }: { params: { id: string } }) {
  const { userId } = auth()
  
  if (!userId) {
    redirect("/sign-in")
  }

  // Fetch material data
  const { data: material, error } = await supabase
    .from('study_materials')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single()

  if (error || !material) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Edit Study Material</h1>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </nav>

      <div className="container py-10">
        <EditForm material={material} />
      </div>
    </div>
  )
} 