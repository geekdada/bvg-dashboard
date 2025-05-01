"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.back()}
      className="flex items-center gap-2 mb-2 sm:mb-4 h-8 bg-transparent text-bvg-yellow border-bvg-yellow hover:bg-bvg-yellow hover:text-black"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="text-sm">Back</span>
    </Button>
  )
}
