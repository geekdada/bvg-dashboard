import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

export default function Loading() {
  return (
    <div className="page-shell min-h-[150vh]">
      <div className="bvg-card mb-6 p-6 sm:p-8">
        <BackButton />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div className="flex items-start gap-5">
            <Skeleton className="h-14 w-14 rounded-[1.2rem] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-28 rounded-full" />
              <Skeleton className="mt-4 h-10 w-72 max-w-full" />
              <div className="mt-4 flex flex-wrap gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Skeleton className="h-28 rounded-[1.1rem]" />
            <Skeleton className="h-28 rounded-[1.1rem]" />
            <Skeleton className="h-28 rounded-[1.1rem]" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="bvg-card">
          <CardHeader className="bvg-card-header">
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <Skeleton className="h-[320px] rounded-[1.35rem] md:h-[420px]" />
          </CardContent>
        </Card>

        <Card className="bvg-card">
          <CardHeader className="bvg-card-header">
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent className="px-4 pb-5 pt-4 sm:px-5">
            <div className="space-y-6">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 items-center justify-center">
                      <Skeleton className="h-3 w-3 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <Skeleton className="h-5 w-40 max-w-full mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="text-right flex-shrink-0">
                          <Skeleton className="h-6 w-16 mb-2 ml-auto rounded-full" />
                          <Skeleton className="h-8 w-20 ml-auto rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bvg-card mt-6">
        <CardHeader className="bvg-card-header">
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
