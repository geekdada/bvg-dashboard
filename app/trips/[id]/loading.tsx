import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

export default function Loading() {
  return (
    <div className="container mx-auto py-8 sm:py-12 px-4 max-w-3xl min-h-[150vh]">
      <div className="bvg-card p-5 mb-6">
        <BackButton />

        <div className="flex items-center gap-5">
          <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-7 w-48 max-w-full mb-3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>

        {/* Trip summary skeleton */}
        <div className="mt-6 pt-5 border-t border-border/60">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-7 w-20 mb-1" />
              <Skeleton className="h-4 w-32 max-w-[120px] sm:max-w-none" />
            </div>
            <div className="flex flex-col items-center px-4">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="flex-1 flex flex-col items-end text-right">
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-7 w-20 mb-1" />
              <Skeleton className="h-4 w-32 max-w-[120px] sm:max-w-none" />
            </div>
          </div>
        </div>
      </div>

      <Card className="bvg-card mb-6">
        <CardHeader className="bvg-card-header">
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent className="p-5">
          <div className="space-y-6">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="w-6 h-6 rounded-full mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <Skeleton className="h-5 w-40 max-w-full mb-2" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Skeleton className="h-5 w-16 mb-1 ml-auto" />
                        <Skeleton className="h-4 w-10 ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
