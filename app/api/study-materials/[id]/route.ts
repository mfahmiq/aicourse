import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { error } = await supabase
      .from('study_materials')
      .delete()
      .match({ 
        id: params.id,
        user_id: userId
      })

    if (error) {
      console.error('Error deleting study material:', error)
      return new NextResponse("Internal Error", { status: 500 })
    }

    return NextResponse.json({ message: "Deleted successfully" })
  } catch (error) {
    console.error('[STUDY_MATERIAL_DELETE]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    
    const { error } = await supabase
      .from('study_materials')
      .update(body)
      .match({ 
        id: params.id,
        user_id: userId
      })

    if (error) {
      console.error('Error updating study material:', error)
      return new NextResponse("Internal Error", { status: 500 })
    }

    return NextResponse.json({ message: "Updated successfully" })
  } catch (error) {
    console.error('[STUDY_MATERIAL_UPDATE]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 