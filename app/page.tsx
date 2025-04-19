import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Example popular stops in Berlin
const popularStops = [
  { id: "900260009", name: "Flughafen BER" },
  { id: "900100009", name: "U Naturkundemuseum" },
  { id: "900100023", name: "U Rosenthaler Platz" },
]

export default function Home() {
  return (
    <div className="container mx-auto py-6 sm:py-12 px-4 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">BVG Departures Dashboard</h1>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
        View real-time departures for Berlin public transport
      </p>

      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl">Popular Stops</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Select a stop to view departures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {popularStops.map((stop) => (
              <Link
                key={stop.id}
                href={`/stops/${stop.id}`}
                className="block p-3 sm:p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="font-medium text-sm sm:text-base">{stop.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {stop.id}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
