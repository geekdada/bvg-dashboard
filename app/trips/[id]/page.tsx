import { notFound } from 'next/navigation'
import { fetchTripDetails } from '@/lib/api'
import { Clock, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import TripStopovers from '@/components/trip-stopovers'
import { formatTime } from '@/lib/utils'
import { BackButton } from '@/components/back-button'
import LineBadge from '@/components/line-badge'
import RemarksDisplay from '@/components/remarks-display'

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

  try {
    const tripData = await fetchTripDetails(tripId)

    // Extract data from the response
    const { line, direction, stopovers, occupancy, remarks } =
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
      <div className="container mx-auto py-8 sm:py-12 px-4 max-w-3xl animate-in fade-in duration-700 slide-in-from-bottom-4">
        {/* Header */}
        <div className="bvg-card p-5 mb-6">
          <BackButton />

          <div className="flex items-center gap-5 mt-6">
            <LineBadge line={line} size="md" />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight line-clamp-2">
                {line.name} to {direction}
              </h1>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge
                  variant="outline"
                  className="bg-transparent border-border text-muted-foreground"
                >
                  {line.product.charAt(0).toUpperCase() + line.product.slice(1)}
                </Badge>
                {line.operator && (
                  <Badge
                    variant="outline"
                    className="bg-transparent border-border text-muted-foreground"
                  >
                    {line.operator.name}
                  </Badge>
                )}
                {occupancy && (
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1.5 bg-transparent border-border ${
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

          {/* Trip summary */}
          <div className="mt-6 pt-5 border-t border-border/60">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Departure</div>
                <div className="text-xl font-mono font-medium text-foreground">
                  {formatTime(departureTime)}
                </div>
                <div className="text-sm text-muted-foreground truncate max-w-[120px] sm:max-w-none mt-0.5">
                  {origin.stop.name}
                </div>
              </div>
              <div className="flex flex-col items-center px-4">
                <Clock className="h-5 w-5 text-muted-foreground mb-1" />
                <div className="text-sm font-medium text-foreground">
                  {durationMinutes} min
                </div>
              </div>
              <div className="flex-1 text-right">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Arrival</div>
                <div className="text-xl font-mono font-medium text-foreground">
                  {formatTime(arrivalTime)}
                </div>
                <div className="text-sm text-muted-foreground truncate max-w-[120px] sm:max-w-none mt-0.5">
                  {destination.stop.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Route */}
        <Card className="bvg-card mb-6">
          <CardHeader className="bvg-card-header">
            <CardTitle className="text-sm font-medium">Trip Route</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <TripStopovers stopovers={stopovers} />
          </CardContent>
        </Card>

        {/* Remarks */}
        {remarks && remarks.length > 0 && (
          <Card className="bvg-card">
            <CardHeader className="bvg-card-header">
              <CardTitle className="text-sm font-medium">Remarks</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <RemarksDisplay
                remarks={remarks}
                className="bg-transparent p-0"
              />
            </CardContent>
          </Card>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching trip data:', error)
    return (
      <div className="container mx-auto py-4 px-4 max-w-3xl">
        <div className="bvg-card p-4 mb-4">
          <BackButton />
          <h1 className="text-xl font-bold text-red-500">Error Loading Trip</h1>
        </div>
        <p className="text-red-500">
          Could not load trip details for ID: {tripId}. The trip might no longer
          be available.
        </p>
      </div>
    )
  }
}
