import { notFound } from "next/navigation"
import { fetchTripDetails } from "@/lib/api"
import { Clock, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TripStopovers from "@/components/trip-stopovers"
import { getProductColor, formatTime } from "@/lib/utils"
import { BackButton } from "@/components/back-button"

export default async function TripPage({ params }: { params: { id: string } }) {
  const tripId = params.id

  if (!tripId) {
    notFound()
  }

  try {
    const tripData = await fetchTripDetails(tripId)

    // Extract data from the response
    const { line, direction, stopovers, occupancy, remarks } = tripData.trip || tripData
    const origin = stopovers[0]
    const destination = stopovers[stopovers.length - 1]
    const departureTime = origin.departure || origin.plannedDeparture
    const arrivalTime = destination.arrival || destination.plannedArrival
    const duration = new Date(arrivalTime).getTime() - new Date(departureTime).getTime()
    const durationMinutes = Math.floor(duration / 60000)

    return (
      <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-3xl">
        <div className="bg-black text-bvg-yellow p-4 mb-4 sm:mb-6 rounded-md">
          <BackButton />

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-12 h-12 text-white font-bold text-lg rounded-full ${getProductColor(line.product)}`}
            >
              {line.name}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 line-clamp-2">
                {line.name} to {direction}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-transparent text-bvg-yellow border-bvg-yellow">
                  {line.product.charAt(0).toUpperCase() + line.product.slice(1)}
                </Badge>
                {line.operator && (
                  <Badge variant="outline" className="bg-transparent text-bvg-yellow border-bvg-yellow">
                    {line.operator.name}
                  </Badge>
                )}
                {occupancy && (
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 bg-transparent border-bvg-yellow ${
                      occupancy === "high"
                        ? "text-red-400"
                        : occupancy === "medium"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    <Users className="h-3 w-3" />
                    <span className="capitalize">{occupancy} occupancy</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Trip summary */}
          <div className="mt-4 pt-4 border-t border-bvg-yellow/30">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm opacity-80">Departure</div>
                <div className="text-lg font-mono">{formatTime(departureTime)}</div>
                <div className="text-sm">{origin.stop.name}</div>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-4 w-4 mb-1" />
                <div className="text-sm font-medium">{durationMinutes} min</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Arrival</div>
                <div className="text-lg font-mono">{formatTime(arrivalTime)}</div>
                <div className="text-sm">{destination.stop.name}</div>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-none shadow-md mb-4">
          <CardHeader className="pb-2 bg-black text-bvg-yellow flex justify-center">
            <CardTitle className="text-lg">Trip Route</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <TripStopovers stopovers={stopovers} />
          </CardContent>
        </Card>

        {remarks && remarks.length > 0 && (
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2 bg-black text-bvg-yellow flex flex-row items-center gap-2">
              <CardTitle className="text-lg">Remarks</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="list-disc pl-5 space-y-2">
                {remarks.map((remark: any, index: number) => (
                  <li key={index} className="text-sm">
                    <span
                      className="[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-800 [&_a]:dark:hover:text-blue-300"
                      dangerouslySetInnerHTML={{ __html: remark.text || remark.summary || remark }}
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
    console.error("Error fetching trip data:", error)
    return (
      <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-3xl">
        <div className="bg-black text-bvg-yellow p-4 mb-4 sm:mb-6 rounded-md">
          <BackButton />
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Error Loading Trip</h1>
        </div>
        <p className="text-red-500">
          Could not load trip details for ID: {tripId}. The trip might no longer be available.
        </p>
      </div>
    )
  }
}
