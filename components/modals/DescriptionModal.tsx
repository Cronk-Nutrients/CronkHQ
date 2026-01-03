'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface DescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  description: string
  productName: string
  onSave?: (description: string) => void
  readOnly?: boolean
}

export default function DescriptionModal({
  isOpen,
  onClose,
  description,
  productName,
  onSave,
  readOnly = false
}: DescriptionModalProps) {
  const [editedDescription, setEditedDescription] = useState(description)
  const [isEditing, setIsEditing] = useState(false)

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setEditedDescription(description)
      setIsEditing(false)
    }
  }, [isOpen, description])

  if (!isOpen) return null

  const handleSave = () => {
    onSave?.(editedDescription)
    setIsEditing(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-white">Product Description</h3>
            <p className="text-sm text-slate-400">{productName}</p>
          </div>
          <div className="flex items-center gap-2">
            {!readOnly && !isEditing && (
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                <i className="fas fa-pencil mr-2"></i>
                Edit
              </Button>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full h-64 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 resize-none"
              placeholder="Enter product description..."
            />
          ) : (
            <div className="prose prose-invert max-w-none">
              {description ? (
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {description}
                </p>
              ) : (
                <p className="text-slate-500 italic">No description available</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
            <Button variant="secondary" onClick={() => { setIsEditing(false); setEditedDescription(description) }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <i className="fas fa-save mr-2"></i>
              Save Description
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
