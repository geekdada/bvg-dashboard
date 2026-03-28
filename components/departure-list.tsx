'use client'

import { Card, CardContent } from '@/components/ui/card'
import DepartureItem from './departure-item'
import { BVGButton } from '@/components/ui/bvg-button'
import { RefreshCw, Map } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useMemo, useCallback } from 'react'
import { getGoogleMapsUrl, getProductIcon, getProductName, getProductHexColor } from '@/lib/utils'
import { TRANSPORT_PRODUCTS } from '@/lib/config'
import type { DepartureListProps } from '@/lib/types'
import type { TransportProduct } from '@/lib/types'

export default function DepartureList({
  departures,
  stopLocation,
  stopName,
}: DepartureListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const activeProduct = searchParams.get('product') || 'all'
  const activePlatform = searchParams.get('platform') || 'all'

  const products = useMemo(() => {
    const productSet = new Set(departures.map((d) => d.line.product))
    const productOrder = Object.keys(TRANSPORT_PRODUCTS) as TransportProduct[]
    return productOrder.filter((p) => productSet.has(p))
  }, [departures])

  const platformsForProduct = useMemo(() => {
    if (activeProduct === 'all') return []
    const filtered = departures.filter((d) => d.line.product === activeProduct)
    const platformSet = new Set(
      filtered
        .map((d) => d.platform || d.plannedPlatform)
        .filter((p): p is string => Boolean(p))
    )
    return Array.from(platformSet).sort((a, b) => {
      const numA = parseInt(a, 10)
      const numB = parseInt(b, 10)
      if (!isNaN(numA) && !isNaN(numB) && numA !== numB) return numA - numB
      return a.localeCompare(b)
    })
  }, [departures, activeProduct])

  const filteredDepartures = useMemo(() => {
    let result = departures
    if (activeProduct !== 'all') {
      result = result.filter((d) => d.line.product === activeProduct)
    }
    if (activeProduct !== 'all' && activePlatform !== 'all') {
      result = result.filter(
        (d) => (d.platform || d.plannedPlatform) === activePlatform
      )
    }
    return result
  }, [departures, activeProduct, activePlatform])

  const updateParams = useCallback(
    (product: string, platform?: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (product === 'all') {
        params.delete('product')
        params.delete('platform')
      } else {
        params.set('product', product)
        if (platform && platform !== 'all') {
          params.set('platform', platform)
        } else {
          params.delete('platform')
        }
      }
      const query = params.toString()
      router.replace(`?${query}`, { scroll: false })
    },
    [router, searchParams]
  )

  const handleProductChange = useCallback(
    (product: string) => {
      updateParams(product)
    },
    [updateParams]
  )

  const handlePlatformChange = useCallback(
    (platform: string) => {
      updateParams(activeProduct, platform)
    },
    [updateParams, activeProduct]
  )

  const handleRefresh = () => {
    startTransition(async () => {
      await router.refresh()
    })
  }

  const openInGoogleMaps = () => {
    if (!stopLocation) return
    const url = getGoogleMapsUrl(stopLocation, stopName)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const tabClass = (isActive: boolean) =>
    `flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-medium rounded-md px-3 py-1.5 transition-all cursor-pointer ${
      isActive
        ? 'bg-background text-foreground shadow-sm'
        : 'text-muted-foreground hover:text-foreground'
    }`

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Departures
        </h2>
        <div className="flex gap-2">
          {stopLocation && (
            <BVGButton
              onClick={openInGoogleMaps}
              title="Open in Google Maps"
              className="flex items-center gap-2"
              variant="outline"
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </BVGButton>
          )}
          <BVGButton
            onClick={handleRefresh}
            disabled={isPending}
            className="flex items-center gap-2"
            variant="outline"
          >
            <RefreshCw
              className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">
              {isPending ? 'Refreshing...' : 'Refresh'}
            </span>
          </BVGButton>
        </div>
      </div>

      {departures.length === 0 ? (
        <Card className="bvg-card">
          <CardContent className="py-12">
            <p className="text-center text-sm text-muted-foreground">
              No departures found
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full">
          {/* Product tabs */}
          <div className="mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 rounded-md overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="inline-flex h-9 items-center justify-start bg-muted/50 p-1 text-muted-foreground w-max min-w-full sm:min-w-0 rounded-lg">
              <button
                onClick={() => handleProductChange('all')}
                className={tabClass(activeProduct === 'all')}
              >
                All
              </button>
              {products.map((product) => (
                <button
                  key={product}
                  onClick={() => handleProductChange(product)}
                  className={tabClass(activeProduct === product)}
                >
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold leading-none"
                    style={{ backgroundColor: `${getProductHexColor(product)}18`, color: getProductHexColor(product) }}
                  >
                    {getProductIcon(product)}
                  </span>
                  <span>{getProductName(product)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Platform sub-tabs */}
          {activeProduct !== 'all' && platformsForProduct.length > 1 && (
            <div className="mb-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 rounded-md overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="inline-flex h-8 items-center justify-start bg-muted/30 p-1 text-muted-foreground w-max min-w-full sm:min-w-0 rounded-lg">
                <button
                  onClick={() => handlePlatformChange('all')}
                  className={tabClass(activePlatform === 'all')}
                >
                  All Platforms
                </button>
                {platformsForProduct.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePlatformChange(p)}
                    className={tabClass(activePlatform === p)}
                  >
                    Pl. {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Departures list */}
          <div className="space-y-3">
            {filteredDepartures.map((departure) => (
              <DepartureItem
                key={`${departure.tripId}-${departure.plannedWhen}`}
                departure={departure}
              />
            ))}
            {filteredDepartures.length === 0 && (
              <Card className="bvg-card">
                <CardContent className="py-12">
                  <p className="text-center text-sm text-muted-foreground">
                    No departures for this filter
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
