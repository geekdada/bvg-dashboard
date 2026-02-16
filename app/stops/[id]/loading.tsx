import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="container mx-auto py-4 px-4 max-w-3xl">
      {/* Header */}
      <div className="bvg-card p-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="bvg-btn-outline mb-4"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>

        {/* Stop Header Skeleton */}
        <div>
          <Skeleton className="h-7 w-3/4 mb-2 bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>

      {/* Departures Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-24 bg-gray-300 dark:bg-gray-700" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-8 w-20 bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>

      {/* Departure Items Skeleton */}
      <div className="space-y-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bvg-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  <Skeleton className="w-16 sm:w-20 rounded-l-2xl bg-gray-300 dark:bg-gray-700" />
                  <div className="flex-1 p-4">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-gray-700" />
                      </div>
                      <div className="text-right space-y-2">
                        <Skeleton className="h-6 w-14 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-10 bg-gray-300 dark:bg-gray-700" />
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
