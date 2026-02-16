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
      <h1 className="text-lg sm:text-xl bvg-heading line-clamp-2">{stop.name}</h1>
      {stop.location && (
        <div className="flex items-center text-sm bvg-text-muted mt-1">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">
            {stop.location.latitude.toFixed(6)}, {stop.location.longitude.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  )
}
