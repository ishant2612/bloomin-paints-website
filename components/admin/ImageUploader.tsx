'use client'

import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploaderProps {
  value: File | null
  imageUrl?: string
  onChange: (file: File | null) => void
}

export default function ImageUploader({ value, imageUrl, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(
    value ? URL.createObjectURL(value) : null
  )

  function handleFile(file: File | null) {
    if (!file) return

    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl border"
          />

          <button
            type="button"
            onClick={() => {
              setPreview(null)
              onChange(null)
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-56 border-2 border-dashed rounded-xl flex flex-col justify-center items-center hover:bg-muted transition"
        >
          <Upload size={36} />
          <p className="mt-2 font-medium">
            Click to upload artwork
          </p>
        </button>
      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleFile(e.target.files?.[0] || null)
        }
      />
    </div>
  )
}