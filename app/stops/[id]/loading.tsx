import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="page-shell min-h-[150vh]">
      <div className="bvg-card mb-8 p-6 sm:p-8">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="mb-6 h-10 px-4 bvg-btn-outline"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 rounded-[1.2rem]" />
            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-5 w-28 rounded-full" />
              <Skeleton className="h-10 w-80 max-w-full" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </div>
          <Skeleton className="h-24 rounded-[1.1rem]" />
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-5 w-36 rounded-full" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-52" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>

      <div className="mb-4 overflow-hidden rounded-[1.35rem] border border-border/60 bg-card/75 p-2">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>

      <div className="space-y-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bvg-card border-border/50">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-3">
                    <Skeleton className="h-10 w-[3.5rem] rounded-[1rem] flex-shrink-0" />
                    <Skeleton className="hidden h-10 w-px sm:block" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-7 w-3/4 max-w-[240px]" />
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-28 rounded-full" />
                          <Skeleton className="h-8 w-24 rounded-full" />
                        </div>
                      </div>
                      <div className="space-y-2.5 flex-shrink-0">
                        <Skeleton className="h-9 w-20 rounded-full sm:ml-auto" />
                        <Skeleton className="h-4 w-16 sm:ml-auto" />
                        <Skeleton className="h-8 w-20 rounded-full sm:ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
