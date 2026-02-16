import { notFound } from 'next/navigation'
import { fetchTripDetails } from '@/lib/api'
import { Clock, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import TripStopovers from '@/components/trip-stopovers'
import { formatTime } from '@/lib/utils'
import { BackButton } from '@/components/back-button'
import LineBadge from '@/components/line-badge'

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
      <div className="container mx-auto py-4 px-4 max-w-3xl">
        {/* Header */}
        <div className="bvg-card p-4 mb-4">
          <BackButton />

          <div className="flex items-center gap-4">
            <LineBadge line={line} size="md" />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl bvg-heading line-clamp-2">
                {line.name} to {direction}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="bg-transparent border-black dark:border-bvg-yellow bvg-text"
                >
                  {line.product.charAt(0).toUpperCase() + line.product.slice(1)}
                </Badge>
                {line.operator && (
                  <Badge
                    variant="outline"
                    className="bg-transparent border-black dark:border-bvg-yellow bvg-text"
                  >
                    {line.operator.name}
                  </Badge>
                )}
                {occupancy && (
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 bg-transparent border-black dark:border-bvg-yellow ${
                      occupancy === 'high'
                        ? 'text-red-500'
                        : occupancy === 'medium'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-green-600 dark:text-green-400'
                    }`}
                  >
                    <Users className="h-3 w-3" />
                    <span className="capitalize">{occupancy}</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Trip summary */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs bvg-text-muted">Departure</div>
                <div className="text-lg font-mono font-bold bvg-text">
                  {formatTime(departureTime)}
                </div>
                <div className="text-sm bvg-text-secondary truncate max-w-[120px] sm:max-w-none">
                  {origin.stop.name}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-4 w-4 bvg-text-muted" />
                <div className="text-sm font-bold bvg-text">{durationMinutes} min</div>
              </div>
              <div className="text-right">
                <div className="text-xs bvg-text-muted">Arrival</div>
                <div className="text-lg font-mono font-bold bvg-text">
                  {formatTime(arrivalTime)}
                </div>
                <div className="text-sm bvg-text-secondary truncate max-w-[120px] sm:max-w-none">
                  {destination.stop.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Route */}
        <Card className="bvg-card mb-4 overflow-hidden">
          <CardHeader className="bvg-card-header">
            <CardTitle className="text-base">Trip Route</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <TripStopovers stopovers={stopovers} />
          </CardContent>
        </Card>

        {/* Remarks */}
        {remarks && remarks.length > 0 && (
          <Card className="bvg-card overflow-hidden">
            <CardHeader className="bvg-card-header">
              <CardTitle className="text-base">Remarks</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {remarks.map((remark: any, index: number) => (
                  <li key={index} className="text-sm bvg-text-secondary">
                    <span
                      className="[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline"
                      dangerouslySetInnerHTML={{
                        __html: remark.text || remark.summary || remark,
                      }}
                    />
                  </li>
                ))}
              </ul>
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
