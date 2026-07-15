'use client'

import { useState } from 'react'
import { createCustomRequest } from '@/app/actions/painting'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function CustomRequestForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [specifications, setSpecifications] = useState('')
  const [basePrice, setBasePrice] = useState('25000')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string>('')
  const router = useRouter()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setPreview(result)
      setImageUrl(result)
    }
    reader.readAsDataURL(file)
  }

  const finalPrice = Math.round(Number(basePrice) * 1.3)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!title || !description || !basePrice || !imageUrl) {
        throw new Error('Please fill in all required fields')
      }

      await createCustomRequest({
        title,
        description,
        imageUrl,
        specifications,
        basePrice: Number(basePrice),
      })

      router.push('/account?tab=requests')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Sunset Beach Portrait"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Base Price (₹) *</label>
          <div className="relative">
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              placeholder="25000"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
              min="10000"
              required
            />
            <div className="text-xs text-muted-foreground mt-1">
              Final price with 30% markup: ₹{finalPrice.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your painting idea in detail..."
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input h-24 resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Specifications & Style</label>
        <textarea
          value={specifications}
          onChange={(e) => setSpecifications(e.target.value)}
          placeholder="e.g., Oil on canvas, modern style, bright colors, etc."
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input h-20 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Upload Reference Image *</label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            required
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            {preview ? (
              <div className="flex flex-col items-center">
                <img src={preview} alt="Preview" className="max-h-40 rounded-lg mb-3" />
                <p className="text-sm text-primary font-semibold">Click to change image</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-foreground mb-1">Click to upload image</p>
                <p className="text-sm text-muted-foreground">or drag and drop your reference photo</p>
              </div>
            )}
          </label>
        </div>
      </div>

      {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>}

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-2">Pricing Breakdown</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base Price:</span>
            <span className="font-semibold">₹{Number(basePrice).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Premium (30%):</span>
            <span className="font-semibold">₹{Math.round(Number(basePrice) * 0.3).toLocaleString('en-IN')}</span>
          </div>
          <div className="border-t border-border pt-1 mt-1 flex justify-between">
            <span className="font-semibold text-foreground">Final Price:</span>
            <span className="font-bold text-primary">₹{finalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Submitting Request...' : 'Submit Custom Request'}
      </button>
    </motion.form>
  )
}
