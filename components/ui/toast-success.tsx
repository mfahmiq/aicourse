"use client"

import { Check } from "lucide-react"
import { toast } from "sonner"

interface ToastProps {
  title: string
  description?: string
}

export function showSuccessToast({ title, description }: ToastProps) {
  toast.success(title, {
    description: description,
    duration: 3000,
    position: "top-center",
  })
}

export function showErrorToast({ title, description }: ToastProps) {
  toast.error(title, {
    description: description,
    duration: 4000,
    position: "top-center",
  })
} 