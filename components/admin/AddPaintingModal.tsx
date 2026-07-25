'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { addPainting } from '@/app/actions/painting'
import ImageUploader from './ImageUploader'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddPaintingModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [form, setForm] = useState({
    title: '',
    description: '',
    story: '',
    image: '',
    price: '',
    category: 'Landscape',
    medium: '',
    dimensions: '',
    availability: 'available',
  })

  if (!open) return null

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()

  //   try {
  //     setLoading(true)

  //     await addPainting({
  //       title: form.title,
  //       description: form.description,
  //       story: form.story,
  //       image: form.image,
  //       price: Number(form.price),
  //       category: form.category,
  //       medium: form.medium,
  //       dimensions: form.dimensions,
  //       // availability: form.availability,
  //     })

  //     onSuccess()
  //     onClose()
  //   } catch (err) {
  //     console.error(err)
  //     alert('Failed to add painting')
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  try {
    setLoading(true)

    if (!imageFile) {
      alert('Please select an image.')
      return
    }

    // Upload image to Cloudinary
    const formData = new FormData()
    formData.append('file', imageFile)

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!uploadResponse.ok) {
      throw new Error('Image upload failed')
    }

    const { url } = await uploadResponse.json()

    // Save painting to database
    await addPainting({
      title: form.title,
      description: form.description,
      story: form.story,
      image: url,
      price: Number(form.price),
      category: form.category,
      medium: form.medium,
      dimensions: form.dimensions,
    })

    onSuccess()
    onClose()

    // Reset form
    setForm({
      title: '',
      description: '',
      story: '',
      image: '',
      price: '',
      category: 'Landscape',
      medium: '',
      dimensions: '',
      availability: 'available',
    })

    setImageFile(null)
  } catch (err) {
    console.error(err)
    alert('Failed to add painting')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X />
        </button>

        <div className="p-6 pb-0">
  <h2 className="text-2xl font-bold">
    Add Painting
  </h2>
</div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          <input
            placeholder="Title"
            className="w-full border rounded-lg p-3"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border rounded-lg p-3"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Story"
            className="w-full border rounded-lg p-3"
            value={form.story}
            onChange={(e) =>
              setForm({
                ...form,
                story: e.target.value,
              })
            }
          />

          <ImageUploader
    value={imageFile}
    onChange={setImageFile}
/>

          <input
            type="number"
            placeholder="Price"
            className="w-full border rounded-lg p-3"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <input
            placeholder="Medium"
            className="w-full border rounded-lg p-3"
            value={form.medium}
            onChange={(e) =>
              setForm({
                ...form,
                medium: e.target.value,
              })
            }
          />

          <input
            placeholder="Dimensions"
            className="w-full border rounded-lg p-3"
            value={form.dimensions}
            onChange={(e) =>
              setForm({
                ...form,
                dimensions: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-lg p-3"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            <option>Landscape</option>
            <option>Abstract</option>
            <option>Portrait</option>
            <option>Nature</option>
            <option>Floral</option>
            <option>Animals</option>
            <option>Still Life</option>
            <option>Urban</option>
          </select>

          {/* <select
            className="w-full border rounded-lg p-3"
            value={form.availability}
            onChange={(e) =>
              setForm({
                ...form,
                availability: e.target.value,
              })
            }
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select> */}

          <div className="sticky bottom-0 bg-white pt-4 border-t">
  <button
    disabled={loading}
    className="w-full bg-primary text-white rounded-lg py-3"
  >
    {loading ? 'Uploading Artwork...' : 'Add Painting'}
  </button>
</div>
        </form>
      </div>
    </div>
  )
}