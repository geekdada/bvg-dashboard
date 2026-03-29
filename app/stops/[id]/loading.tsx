import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 sm:py-12 px-4 max-w-3xl min-h-[150vh]">
      {/* Header */}
      <div className="bvg-card p-5 mb-8">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="bvg-btn-outline mb-6"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>

        {/* Stop Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      {/* Departures Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      {/* Departure Items Skeleton */}
      <div className="space-y-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bvg-card p-4 sm:p-5 border-border/50">
              <div className="flex items-start gap-4">
                <Skeleton className="h-8 w-[3rem] sm:h-10 sm:w-[3.5rem] rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 space-y-2.5">
                      <Skeleton className="h-5 w-3/4 max-w-[200px]" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="text-right space-y-2.5 flex-shrink-0">
                      <Skeleton className="h-6 w-14 ml-auto" />
                      <Skeleton className="h-4 w-10 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}
