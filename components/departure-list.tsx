"use client"

import { Card, CardContent } from "@/components/ui/card"
import DepartureItem from "./departure-item"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition, useState } from "react"

interface DepartureListProps {
  departures: any[]
}

export default function DepartureList({ departures }: DepartureListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRefresh = () => {
    startTransition(async () => {
      await router.refresh()
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Departures</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3"
          onClick={handleRefresh}
          disabled={isPending}
        >
          <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${isPending ? "animate-spin" : ""}`} />
          <span>{isPending ? "Refreshing..." : "Refresh"}</span>
        </Button>
      </div>

      {departures.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-gray-500">No departures found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {departures.map((departure) => (
            <DepartureItem key={`${departure.tripId}-${departure.plannedWhen}`} departure={departure} />
          ))}
        </div>
      )}
    </div>
  )
}
