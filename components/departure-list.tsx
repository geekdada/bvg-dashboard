"use client"

import { Card, CardContent } from "@/components/ui/card"
import DepartureItem from "./departure-item"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface DepartureListProps {
  departures: any[]
}

export default function DepartureList({ departures }: DepartureListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Departures</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {departures.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-gray-500">No departures found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {departures.map((departure) => (
            <DepartureItem key={`${departure.tripId}-${departure.plannedWhen}`} departure={departure} />
          ))}
        </div>
      )}
    </div>
  )
}
