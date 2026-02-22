'use client'

import React, { useCallback, useState } from 'react'
import { Copy, Languages, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Remark {
  text?: string
  summary?: string
}

interface RemarksDisplayProps {
  remarks?: Remark[]
  className?: string
}

export default function RemarksDisplay({
  remarks,
  className = '',
}: RemarksDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A' || target.closest('a')) {
      const anchor = target.tagName === 'A' ? target : target.closest('a')
      if (
        anchor instanceof HTMLAnchorElement &&
        anchor.href &&
        !anchor.href.startsWith(window.location.origin)
      ) {
        e.stopPropagation()
        e.preventDefault()
        window.open(anchor.href, '_blank', 'noopener,noreferrer')
      }
    }
  }, [])

  const getPlainText = useCallback(() => {
    if (!remarks) return ''
    return remarks
      .map((r) => r.text || r.summary || '')
      .join(' | ')
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/g, ' ')
      .trim()
  }, [remarks])

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const textToCopy = getPlainText()

      try {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy', err)
      }
    },
    [getPlainText]
  )

  const handleTranslate = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const textToTranslate = getPlainText()

      const url = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(
        textToTranslate
      )}&op=translate`
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    [getPlainText]
  )

  if (!remarks || remarks.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-col gap-2 bg-muted/50 p-2 lg:px-4 lg:py-3 rounded',
        className
      )}
    >
      <div
        className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
        onClick={handleClick}
      >
        {remarks.map((remark, i) => (
          <React.Fragment key={i}>
            {i !== 0 && <span> | </span>}
            <span
              className="[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-800 [&_a]:dark:hover:text-blue-300 [&_a]:relative [&_a]:z-10"
              dangerouslySetInnerHTML={{
                __html: remark.text || remark.summary || '',
              }}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Copy remarks"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
        <button
          onClick={handleTranslate}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Translate remarks"
        >
          <Languages className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
