import { notFound } from 'next/navigation'
import { fetchTripDetails } from '@/lib/api'
import { Clock, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import TripStopovers from '@/components/trip-stopovers'
import { formatTime, getProductHexColor } from '@/lib/utils'
import { BackButton } from '@/components/back-button'
import LineBadge from '@/components/line-badge'
import RemarksDisplay from '@/components/remarks-display'
import TripMap from '@/components/trip-map'

export default async function TripPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tripId = decodeURIComponent(id)

  if (!tripId) {
    notFound()
  }

  let tripData: Awaited<ReturnType<typeof fetchTripDetails>> | null = null

  try {
    tripData = await fetchTripDetails(tripId)
  } catch (error) {
    console.error('Error fetching trip data:', error)
  }

  if (!tripData) {
    return (
      <div className="page-shell">
        <div className="bvg-card mb-4 p-6">
          <BackButton />
          <div className="station-label">Route unavailable</div>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
            Couldn&apos;t load this trip
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            This trip may no longer be available, or the route details
            temporarily failed to load.
          </p>
        </div>
      </div>
    )
  }

  const { line, direction, stopovers, occupancy, remarks, polyline } =
    tripData.trip || tripData

  if (!stopovers || stopovers.length === 0) {
    notFound()
  }

  const origin = stopovers[0]
  const destination = stopovers[stopovers.length - 1]
  const departureTime = origin.departure || origin.plannedDeparture
  const arrivalTime = destination.arrival || destination.plannedArrival

  if (!departureTime || !arrivalTime) {
    notFound()
  }

  const duration =
    new Date(arrivalTime).getTime() - new Date(departureTime).getTime()
  const durationMinutes = Math.floor(duration / 60000)

  return (
    <div className="page-shell">
      <div className="bvg-card mb-6 p-6 sm:p-8">
        <BackButton />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div className="min-w-0">
            <div className="station-label">Route panel</div>
            <div className="mt-5 flex items-start gap-5">
              <LineBadge line={line} size="lg" />
              <div className="min-w-0">
                <h1 className="line-clamp-2 text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
                  {line.name} to {direction}
                </h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="station-chip border-border/70 bg-muted/30 normal-case tracking-[0.14em]"
                  >
                    {line.product.charAt(0).toUpperCase() + line.product.slice(1)}
                  </Badge>
                  {line.operator && (
                    <Badge
                      variant="outline"
                      className="station-chip border-border/70 bg-muted/30 normal-case tracking-[0.12em]"
                    >
                      {line.operator.name}
                    </Badge>
                  )}
                  {occupancy && (
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1.5 rounded-full border-border/70 bg-muted/30 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] ${
                        occupancy === 'high'
                          ? 'text-destructive'
                          : occupancy === 'medium'
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-green-600 dark:text-green-400'
                      }`}
                    >
                      <Users className="h-3.5 w-3.5" />
                      <span className="capitalize">{occupancy}</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="panel-inset p-4">
              <div className="section-kicker">Departure</div>
              <div className="mt-3 font-mono text-2xl font-medium text-foreground tabular-nums">
                {formatTime(departureTime)}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {origin.stop.name}
              </div>
            </div>
            <div className="panel-inset p-4 text-center">
              <div className="section-kicker">Duration</div>
              <Clock className="signal-text mx-auto mt-3 h-5 w-5" />
              <div className="mt-3 text-sm font-medium text-foreground text-nowrap">
                {durationMinutes} min
              </div>
            </div>
            <div className="panel-inset p-4 sm:text-right">
              <div className="section-kicker">Arrival</div>
              <div className="mt-3 font-mono text-2xl font-medium text-foreground tabular-nums">
                {formatTime(arrivalTime)}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {destination.stop.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="bvg-card">
          <CardHeader className="bvg-card-header">
            <CardTitle>Route map</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <TripMap
              stopovers={stopovers}
              polyline={polyline}
              lineColor={getProductHexColor(line.product)}
            />
          </CardContent>
        </Card>

        <Card className="bvg-card">
          <CardHeader className="bvg-card-header">
            <CardTitle>Trip route</CardTitle>
          </CardHeader>
          <CardContent className="pl-4 pr-4 pb-5 pt-4 sm:pl-5 sm:pr-5">
            <TripStopovers stopovers={stopovers} />
          </CardContent>
        </Card>
      </div>

      {remarks && remarks.length > 0 && (
        <Card className="bvg-card mt-6">
          <CardHeader className="bvg-card-header">
            <CardTitle>Remarks</CardTitle>
          </CardHeader>
          <CardContent>
            <RemarksDisplay remarks={remarks} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
