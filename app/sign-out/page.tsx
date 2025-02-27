"use client"

import { useEffect } from "react"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function SignOutPage() {
  const { signOut } = useClerk()
  const router = useRouter()
  
  useEffect(() => {
    const performSignOut = async () => {
      await signOut()
      router.push("/")
    }
    
    performSignOut()
  }, [signOut, router])
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
          <div className="text-2xl font-bold text-white">ES</div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Signing out...</h1>
        <p className="mt-2 text-gray-600">Please wait while we sign you out.</p>
      </div>
    </div>
  )
}