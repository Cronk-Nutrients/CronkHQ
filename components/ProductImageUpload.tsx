'use client'

import { useState, useRef } from 'react'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { ProductImage } from '@/types'

interface ProductImageUploadProps {
  productId: string
  images: ProductImage[]
  onImagesChange?: (images: ProductImage[]) => void
  maxImages?: number
}

export default function ProductImageUpload({
  productId,
  images = [],
  onImagesChange,
  maxImages = 10
}: ProductImageUploadProps) {
  const { user } = useAuth()
  const { organization } = useOrganization()
  const { success, error } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)

  // Handle file selection
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    if (!organization?.id || !user) return

    // Check max images
    if (images.length + files.length > maxImages) {
      error(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)
    setUploadProgress(0)

    const newImages: ProductImage[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Validate file type
        if (!file.type.startsWith('image/')) {
          error(`${file.name} is not an image`)
          continue
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          error(`${file.name} is too large (max 5MB)`)
          continue
        }

        // Generate unique filename
        const timestamp = Date.now()
        const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const filename = `${timestamp}_${safeFilename}`

        // Upload to Firebase Storage - SCOPED TO ORGANIZATION
        const imagePath = `organizations/${organization.id}/products/${productId}/images/${filename}`
        const imageRef = ref(storage, imagePath)

        await uploadBytes(imageRef, file)
        const url = await getDownloadURL(imageRef)

        const newImage: ProductImage = {
          id: `img_${timestamp}_${i}`,
          url,
          thumbnailUrl: url, // Use same URL for now
          filename,
          size: file.size,
          isPrimary: images.length === 0 && i === 0, // First image is primary
          uploadedAt: new Date().toISOString(),
          uploadedBy: user.uid,
        }

        newImages.push(newImage)
        setUploadProgress(((i + 1) / files.length) * 100)
      }

      // Update Firestore with new images
      if (newImages.length > 0) {
        const allImages = [...images, ...newImages]
        const productRef = doc(db, 'organizations', organization.id, 'products', productId)

        await updateDoc(productRef, {
          images: allImages,
          // Set thumbnail to primary image URL
          thumbnail: allImages.find(img => img.isPrimary)?.thumbnailUrl || allImages[0]?.thumbnailUrl || null
        })

        onImagesChange?.(allImages)
        success(`${newImages.length} image${newImages.length > 1 ? 's' : ''} uploaded`)
      }
    } catch (err) {
      console.error('Upload error:', err)
      error('Failed to upload images')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  // Delete image
  const handleDelete = async (image: ProductImage) => {
    if (!organization?.id) return
    if (!confirm('Delete this image?')) return

    try {
      // Delete from Storage
      const imagePath = `organizations/${organization.id}/products/${productId}/images/${image.filename}`
      const imageRef = ref(storage, imagePath)

      try {
        await deleteObject(imageRef)
      } catch (storageErr) {
        console.warn('Could not delete from storage:', storageErr)
      }

      // Update Firestore
      const updatedImages = images.filter(img => img.id !== image.id)

      // If deleted primary, make first remaining image primary
      if (image.isPrimary && updatedImages.length > 0) {
        updatedImages[0].isPrimary = true
      }

      const productRef = doc(db, 'organizations', organization.id, 'products', productId)
      await updateDoc(productRef, {
        images: updatedImages,
        thumbnail: updatedImages.find(img => img.isPrimary)?.thumbnailUrl || null
      })

      onImagesChange?.(updatedImages)
      success('Image deleted')
    } catch (err) {
      console.error('Delete error:', err)
      error('Failed to delete image')
    }
  }

  // Set as primary image
  const handleSetPrimary = async (image: ProductImage) => {
    if (!organization?.id || image.isPrimary) return

    try {
      const updatedImages = images.map(img => ({
        ...img,
        isPrimary: img.id === image.id
      }))

      const productRef = doc(db, 'organizations', organization.id, 'products', productId)
      await updateDoc(productRef, {
        images: updatedImages,
        thumbnail: image.thumbnailUrl
      })

      onImagesChange?.(updatedImages)
      success('Primary image updated')
    } catch (err) {
      console.error('Error setting primary:', err)
      error('Failed to update primary image')
    }
  }

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragOver
            ? 'border-emerald-500 bg-emerald-500/10'
            : 'border-slate-700 hover:border-slate-600'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
      >
        {uploading ? (
          <div className="space-y-2">
            <i className="fas fa-spinner fa-spin text-2xl text-emerald-400"></i>
            <p className="text-slate-400">Uploading... {Math.round(uploadProgress)}%</p>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <i className="fas fa-cloud-upload-alt text-3xl text-slate-500 mb-3"></i>
            <p className="text-white mb-1">Drag and drop images here</p>
            <p className="text-slate-500 text-sm mb-3">or</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <i className="fas fa-folder-open mr-2"></i>
              Browse Files
            </Button>
            <p className="text-slate-500 text-xs mt-3">
              JPG, PNG, WebP - Max 5MB - Up to {maxImages} images
            </p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={`relative group rounded-lg overflow-hidden border-2 aspect-square ${
                image.isPrimary ? 'border-emerald-500' : 'border-slate-700'
              }`}
            >
              <img
                src={image.thumbnailUrl || image.url}
                alt="Product"
                className="w-full h-full object-cover"
              />

              {/* Primary badge */}
              {image.isPrimary && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-500 text-white text-xs rounded">
                  Primary
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!image.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(image)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="Set as primary"
                  >
                    <i className="fas fa-star text-white"></i>
                  </button>
                )}
                <button
                  onClick={() => window.open(image.url, '_blank')}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  title="View full size"
                >
                  <i className="fas fa-expand text-white"></i>
                </button>
                <button
                  onClick={() => handleDelete(image)}
                  className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-lg transition-colors"
                  title="Delete"
                >
                  <i className="fas fa-trash text-white"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {images.length === 0 && !uploading && (
        <p className="text-center text-slate-500 text-sm py-4">
          No images uploaded yet
        </p>
      )}
    </div>
  )
}
