'use client'

import { Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { deletePainting } from '@/app/actions/painting'

interface Props {
  open: boolean
  painting: any
  onClose: () => void
  onSuccess: () => void
}

export default function DeletePaintingDialog({
  open,
  painting,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false)

  if (!open || !painting) return null

  async function handleDelete() {
    try {
      setLoading(true)

      await deletePainting(painting.id)

      onSuccess()
      onClose()
    } catch (err) {
      console.error(err)
      alert('Failed to delete painting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X />
        </button>

        <div className="flex flex-col items-center text-center">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <Trash2 className="text-red-600" size={28} />
          </div>

          <h2 className="text-2xl font-bold">
            Delete Painting?
          </h2>

          <p className="text-gray-600 mt-2">
            Are you sure you want to delete
          </p>

          <p className="font-semibold mt-1">
            "{painting.title}"
          </p>

          <p className="text-sm text-red-500 mt-3">
            This action cannot be undone.
          </p>

          <div className="flex gap-3 mt-8 w-full">

            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 border rounded-lg py-3"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-3"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}