"use client"

import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { useRouter } from "next/navigation"

export function RefreshButton() {
  const router = useRouter()

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2"
      onClick={() => router.refresh()}
    >
      <RefreshCcw className="h-4 w-4" />
      Refresh
    </Button>
  )
} 