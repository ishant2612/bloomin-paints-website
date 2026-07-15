'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Painting, formatPrice } from '@/lib/paintings-data'
import { Eye } from 'lucide-react'

interface PaintingCardProps {
  painting: Painting
}

export default function PaintingCard({ painting }: PaintingCardProps) {
  return (
    <motion.div
      className="group h-full"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/painting/${painting.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-secondary to-background">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={painting.image}
                alt={painting.title}
                fill
                className="object-cover"
              />

              {/* Overlay with details on hover */}
              <motion.div
                className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full font-medium text-primary"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </motion.div>
              </motion.div>

              {/* Availability Badge */}
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  painting.availability === 'Available'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {painting.availability}
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground">
                {painting.category}
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 mb-2">
                {painting.title}
              </h3>
              <p className="text-sm text-foreground/70 line-clamp-2 mb-3">
                {painting.description}
              </p>
              <div className="flex items-center justify-between text-xs text-foreground/60 mb-4">
                <span>{painting.medium}</span>
                <span>
                  {painting.dimensions.width}
                  &quot; × {painting.dimensions.height}&quot;
                </span>
              </div>
            </div>

            {/* Price */}
            <motion.div
              className="flex items-center justify-between pt-4 border-t border-border"
              whileHover={{ color: '#d4a574' }}
            >
              <span className="font-heading text-2xl font-semibold text-primary">
                {formatPrice(painting.price)}
              </span>
              <motion.button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
