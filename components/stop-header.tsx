import { MapPin } from "lucide-react"

interface StopHeaderProps {
  stop: {
    id: string
    name: string
    location?: {
      latitude: number
      longitude: number
    }
  }
}

export default function StopHeader({ stop }: StopHeaderProps) {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 line-clamp-2">{stop.name}</h1>
      {stop.location && (
        <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
          <span className="truncate">
            {stop.location.latitude.toFixed(6)}, {stop.location.longitude.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  )
}
