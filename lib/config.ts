import type { BVGConfig, TransportProduct } from './types'

export const BVG_CONFIG: BVGConfig = {
  apiBaseUrl: 'https://v6.bvg.transport.rest',
  defaultDuration: 30,
  searchMinLength: 2,
  searchDebounceMs: 300,
  searchMaxResults: 10,
}

export const TRANSPORT_PRODUCTS: Record<TransportProduct, { 
  icon: string
  name: string
  color: string
  hexColor: string
}> = {
  suburban: {
    icon: 'S',
    name: 'S-Bahn',
    color: 'bg-transport-suburban',
    hexColor: '#006F35'
  },
  subway: {
    icon: 'U',
    name: 'U-Bahn',
    color: 'bg-transport-subway',
    hexColor: '#0066B3'
  },
  tram: {
    icon: 'T',
    name: 'Tram',
    color: 'bg-transport-tram',
    hexColor: '#DC0000'
  },
  bus: {
    icon: 'B',
    name: 'Bus',
    color: 'bg-transport-bus',
    hexColor: '#8C4799'
  },
  ferry: {
    icon: 'F',
    name: 'Ferry',
    color: 'bg-transport-ferry',
    hexColor: '#00A1DE'
  },
  express: {
    icon: 'E',
    name: 'Express',
    color: 'bg-transport-express',
    hexColor: '#F18700'
  },
  regional: {
    icon: 'R',
    name: 'Regional',
    color: 'bg-transport-regional',
    hexColor: '#DB0066'
  }
}

export const POPULAR_STOPS = [
  { id: "900260009", name: "Flughafen BER" },
  { id: "900100009", name: "U Naturkundemuseum" },
  { id: "900100501", name: "U Schwartzkopffstr." },
  { id: "900100023", name: "U Rosenthaler Platz" },
  { id: "900003201", name: "S+U Berlin Hauptbahnhof" },
] as const

export const DELAY_THRESHOLDS = {
  ON_TIME: 0,
  MINOR_DELAY: 180, // 3 minutes
  MAJOR_DELAY: 300, // 5 minutes
} as const

export const CSS_CLASSES = {
  delay: {
    onTime: 'text-green-600 dark:text-green-400',
    minor: 'text-yellow-600 dark:text-yellow-400',
    major: 'text-red-600 dark:text-red-400',
  },
  button: {
    primary: 'bvg-btn-outline',
  },
  card: {
    bvg: 'bvg-card',
  }
} as const