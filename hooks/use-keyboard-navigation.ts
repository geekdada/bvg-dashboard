import { useState, useCallback, KeyboardEvent } from 'react'

interface UseKeyboardNavigationProps {
  itemCount: number
  onSelect: (index: number) => void
  onEscape?: () => void
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  onEscape,
}: UseKeyboardNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (itemCount === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => (prev < itemCount - 1 ? prev + 1 : prev))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < itemCount) {
            onSelect(selectedIndex)
          }
          break
        case 'Escape':
          e.preventDefault()
          onEscape?.()
          break
      }
    },
    [itemCount, selectedIndex, onSelect, onEscape]
  )

  const resetSelection = useCallback(() => {
    setSelectedIndex(-1)
  }, [])

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
    resetSelection,
  }
}