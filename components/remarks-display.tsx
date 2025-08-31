import React from "react"

interface Remark {
  text?: string
  summary?: string
}

interface RemarksDisplayProps {
  remarks?: Remark[]
  className?: string
}

export default function RemarksDisplay({ remarks, className = "" }: RemarksDisplayProps) {
  if (!remarks || remarks.length === 0) return null

  return (
    <div className={`text-xs sm:text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      {remarks.map((remark, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <span> | </span>}
          <span
            className="[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-800 [&_a]:dark:hover:text-blue-300"
            dangerouslySetInnerHTML={{ __html: remark.text || remark.summary || "" }}
          />
        </React.Fragment>
      ))}
    </div>
  )
}