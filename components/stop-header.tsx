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
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{stop.name}</h1>
      {stop.location && (
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {stop.location.latitude.toFixed(6)}, {stop.location.longitude.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  )
}
