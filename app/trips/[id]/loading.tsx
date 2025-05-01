import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"

export default function Loading() {
  return (
    <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-3xl">
      <div className="bg-black text-bvg-yellow p-4 mb-4 sm:mb-6 rounded-md">
        <BackButton />

        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="h-7 w-48 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>

        {/* Trip summary skeleton */}
        <div className="mt-4 pt-4 border-t border-bvg-yellow/30">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-6 w-20 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-16" />
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-6 w-20 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-md mb-4">
        <CardHeader className="pb-2 bg-black text-bvg-yellow">
          <Skeleton className="h-6 w-24 bg-bvg-yellow" />
        </CardHeader>
        <CardContent className="p-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-start gap-4 py-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-40 mb-1" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
