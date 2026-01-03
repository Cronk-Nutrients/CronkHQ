'use client'

import { useState } from 'react'

interface DescriptionPreviewProps {
  description: string
  maxLength?: number
  className?: string
}

export default function DescriptionPreview({
  description,
  maxLength = 150,
  className = ''
}: DescriptionPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!description) {
    return <span className="text-slate-500 italic">No description</span>
  }

  const needsTruncation = description.length > maxLength
  const displayText = isExpanded ? description : description.substring(0, maxLength)

  return (
    <div className={className}>
      <p className="text-slate-300 whitespace-pre-wrap">
        {displayText}
        {needsTruncation && !isExpanded && '...'}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-emerald-400 hover:text-emerald-300 text-sm mt-2 flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <i className="fas fa-chevron-up"></i>
              Show less
            </>
          ) : (
            <>
              <i className="fas fa-chevron-down"></i>
              Read more
            </>
          )}
        </button>
      )}
    </div>
  )
}
