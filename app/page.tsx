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
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">BVG Departures Dashboard</h1>
      <p className="text-gray-600 mb-8">View real-time departures for Berlin public transport</p>

      <Card>
        <CardHeader>
          <CardTitle>Popular Stops</CardTitle>
          <CardDescription>Select a stop to view departures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularStops.map((stop) => (
              <Link
                key={stop.id}
                href={`/stops/${stop.id}`}
                className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="font-medium">{stop.name}</h3>
                <p className="text-sm text-gray-500">ID: {stop.id}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
