import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-3xl">
      <div className="bg-black text-bvg-yellow p-4 mb-4 sm:mb-6 rounded-md">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 mb-2 sm:mb-4 h-8 bg-transparent text-bvg-yellow border-bvg-yellow hover:bg-bvg-yellow hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Button>
        </Link>

        {/* Stop Header Skeleton */}
        <div>
          <Skeleton className="h-7 sm:h-8 w-3/4 mb-1 sm:mb-2 bg-gray-700" />
          <Skeleton className="h-4 w-1/2 bg-gray-700" />
        </div>
      </div>

      {/* Departures Header Skeleton */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <Skeleton className="h-6 sm:h-7 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" /> {/* Map button skeleton */}
          <Skeleton className="h-8 w-20" /> {/* Refresh button skeleton */}
        </div>
      </div>

      {/* Departure Items Skeleton */}
      <div className="space-y-2 sm:space-y-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Line Circle */}
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1">
                      {/* Destination */}
                      <Skeleton className="h-5 sm:h-6 w-3/4" />
                      {/* Platform */}
                      <Skeleton className="h-5 w-16" />
                    </div>

                    {/* Remarks */}
                    <Skeleton className="h-4 w-1/2 mt-1" />
                  </div>

                  {/* Time */}
                  <div className="flex-shrink-0 ml-1">
                    <Skeleton className="h-6 w-14 mb-1" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
