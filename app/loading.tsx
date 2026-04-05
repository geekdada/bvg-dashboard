import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="page-shell">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="bvg-card p-6 sm:p-8">
          <div className="space-y-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <Skeleton className="h-14 w-14 rounded-[1.2rem]" />
                <div className="space-y-3">
                  <Skeleton className="h-5 w-36 rounded-full" />
                  <Skeleton className="h-12 w-72 max-w-full" />
                  <Skeleton className="h-4 w-[28rem] max-w-full" />
                </div>
              </div>
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-24 rounded-[1.1rem]" />
              <Skeleton className="h-24 rounded-[1.1rem]" />
              <Skeleton className="h-24 rounded-[1.1rem]" />
            </div>

            <Skeleton className="h-14 rounded-[1.35rem]" />
          </div>
        </div>

        <Card className="bvg-card">
          <CardHeader className="bvg-card-header">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-52" />
          </CardHeader>
          <CardContent className="p-0">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border-b border-border/50 px-5 py-4 last:border-0">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="mt-2 h-4 w-52" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index} className="bvg-card">
            <CardHeader className="bvg-card-header">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-2 h-4 w-56" />
            </CardHeader>
            <CardContent className="p-0">
              {Array.from({ length: 4 }).map((__, row) => (
                <div key={row} className="border-b border-border/50 px-5 py-4 last:border-0">
                  <Skeleton className="h-5 w-44" />
                  <Skeleton className="mt-2 h-4 w-28" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

