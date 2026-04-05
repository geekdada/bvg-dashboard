'use client'

import type React from 'react'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { searchStops } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation'
import { BVG_CONFIG } from '@/lib/config'
import type { SearchResponse } from '@/lib/types'

export default function StopSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [popupStyle, setPopupStyle] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLUListElement>(null)
  const debouncedQuery = useDebounce(query, BVG_CONFIG.searchDebounceMs)

  const navigateToStop = useCallback(
    (stopId: string) => {
      setIsSearching(false)
      router.push(`/stops/${stopId}`, { scroll: true })
    },
    [router]
  )

  const { selectedIndex, setSelectedIndex, handleKeyDown, resetSelection } =
    useKeyboardNavigation({
      itemCount: results.length,
      onSelect: (index) => navigateToStop(results[index].id),
      onEscape: () => {
        setIsSearching(false)
        inputRef.current?.blur()
      },
    })

  const searchForStops = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery || searchQuery.length < BVG_CONFIG.searchMinLength) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const data = await searchStops(searchQuery)
        setResults(data)
        resetSelection()
      } catch (error) {
        console.error('Error searching for stops:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [resetSelection]
  )

  // Effect to trigger search when debounced query changes
  useEffect(() => {
    searchForStops(debouncedQuery)
  }, [debouncedQuery, searchForStops])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsSearching(true)
  }

  const handleInputFocus = () => {
    if (query.length >= BVG_CONFIG.searchMinLength) {
      setIsSearching(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding results to allow for clicking on them
    setTimeout(() => {
      setIsSearching(false)
    }, 200)
  }

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[
        selectedIndex
      ] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
        })
      }
    }
  }, [selectedIndex])

  useEffect(() => {
    if (!isSearching) return

    const updatePopupPosition = () => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      setPopupStyle({
        top: rect.bottom + 12,
        left: rect.left,
        width: rect.width,
      })
    }

    updatePopupPosition()
    window.addEventListener('resize', updatePopupPosition)
    window.addEventListener('scroll', updatePopupPosition, true)

    return () => {
      window.removeEventListener('resize', updatePopupPosition)
      window.removeEventListener('scroll', updatePopupPosition, true)
    }
  }, [isSearching])

  const popup =
    isSearching && popupStyle && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="fixed z-[80]"
            style={{
              top: popupStyle.top,
              left: popupStyle.left,
              width: popupStyle.width,
            }}
          >
            <Card className="max-h-80 overflow-auto border-border/90 ring-1 ring-black/5 shadow-[0_40px_100px_-34px_hsl(220_35%_10%/0.42),0_22px_40px_-24px_hsl(220_28%_10%/0.28)]">
              <CardContent className="p-0 flex flex-col">
                {isLoading ? (
                  <div className="p-6">
                    <LoadingSpinner text="Searching..." />
                  </div>
                ) : results.length > 0 ? (
                  <ul id="search-results" ref={resultsRef} role="listbox">
                    {results.map((stop, index) => (
                      <li
                        key={stop.id}
                        id={`result-${index}`}
                        role="option"
                        aria-selected={selectedIndex === index}
                        className={`bvg-row group ${
                          selectedIndex === index ? 'bg-primary/10' : ''
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => navigateToStop(stop.id)}
                      >
                        <div>
                          <div className="text-sm font-medium text-foreground transition-colors">
                            {stop.name}
                          </div>
                          <div className="mt-1 font-mono text-xs text-muted-foreground tabular-nums">
                            {stop.id}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : query.length >= BVG_CONFIG.searchMinLength ? (
                  <div className="p-6 text-center text-sm text-muted-foreground">
                    No matching stops found
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-muted-foreground">
                    Type at least {BVG_CONFIG.searchMinLength} characters to
                    search
                  </div>
                )}
              </CardContent>
            </Card>
          </div>,
          document.body
        )
      : null

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search a station or stop"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-14 rounded-[1.35rem] border-border/90 bg-card pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground/80 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.45),0_18px_36px_-28px_hsl(220_30%_10%/0.26)] focus-visible:border-primary"
          aria-label="Search for stops"
          aria-autocomplete="list"
          aria-controls={isSearching ? 'search-results' : undefined}
          aria-activedescendant={
            selectedIndex >= 0 ? `result-${selectedIndex}` : undefined
          }
          role="combobox"
          aria-expanded={isSearching}
        />
        <Search className="signal-text absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
      {popup}
    </div>
  )
}
