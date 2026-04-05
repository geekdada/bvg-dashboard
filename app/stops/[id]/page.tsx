import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import DepartureList from "@/components/departure-list"
import StopHeader from "@/components/stop-header"
import { fetchDepartures } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function StopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const stopId = id

  if (!stopId) {
    return notFound()
  }

  let data: Awaited<ReturnType<typeof fetchDepartures>> | null = null

  try {
    data = await fetchDepartures(stopId)
  } catch (error) {
    console.error("Error fetching data:", error)
  }

  if (!data) {
    return (
      <div className="page-shell">
        <div className="bvg-card mb-6 p-6">
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
          <div className="station-label">Board unavailable</div>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
            Couldn&apos;t load this stop board
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            The departure board for stop ID{' '}
            <span className="font-mono tabular-nums text-foreground">
              {stopId}
            </span>{' '}
            is not available right now. Please check the ID or try again in a
            moment.
          </p>
        </div>
      </div>
    )
  }

  const stopInfo =
    data.departures && data.departures.length > 0 ? data.departures[0].stop : undefined

  if (!stopInfo) {
    return notFound()
  }

  return (
    <div className="page-shell">
      <div className="bvg-card mb-8 p-6 sm:p-8">
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
        <StopHeader stop={stopInfo} />
      </div>

      <Suspense>
        <DepartureList departures={data.departures || []} stopLocation={stopInfo.location} stopName={stopInfo.name} />
      </Suspense>
    </div>
  )
}
