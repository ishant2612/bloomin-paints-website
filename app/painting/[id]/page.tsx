'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { paintings } from '@/lib/paintings-data'
import { ChevronLeft, ChevronRight, ZoomIn, Heart, Share2 } from 'lucide-react'

export default function PaintingDetails() {
  const params = useParams()
  const id = params.id as string
  const painting = paintings.find((p) => p.id === id)

  const [isLiked, setIsLiked] = useState(false)
  const [imageZoom, setImageZoom] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  if (!painting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Painting Not Found
          </h1>
          <p className="text-foreground/70 mb-6">
            The painting you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/gallery">
            <motion.button
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Gallery
            </motion.button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedPaintings = paintings
    .filter((p) => p.category === painting.category && p.id !== painting.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          className="flex items-center gap-2 text-sm text-foreground/60"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/gallery" className="hover:text-foreground transition-colors">
            Gallery
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{painting.title}</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Main Image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-background aspect-square group cursor-zoom-in"
            ref={containerRef}
            whileHover={{ scale: 1.01 }}
            onMouseMove={(e) => {
              if (imageZoom > 1 && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                containerRef.current.style.transformOrigin = `${(x / rect.width) * 100}% ${
                  (y / rect.height) * 100
                }%`
              }
            }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ scale: imageZoom }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <Image
                src={painting.image}
                alt={painting.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                onClick={() => setImageZoom((z) => Math.max(1, z - 0.2))}
                className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ZoomIn className="w-5 h-5 rotate-180" />
              </motion.button>
              <motion.button
                onClick={() => setImageZoom((z) => Math.min(2, z + 0.2))}
                className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ZoomIn className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Availability Badge */}
            <div className="absolute bottom-4 left-4">
              <div
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  painting.availability === 'Available'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {painting.availability}
              </div>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[painting.image, painting.image, painting.image].map((img, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={img}
                  alt={`${painting.title} view ${idx + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Header */}
          <div>
            <motion.h1
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {painting.title}
            </motion.h1>
            <motion.p
              className="text-lg text-foreground/70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {painting.description}
            </motion.p>
          </div>

          {/* Price & Artist Info */}
          <motion.div
            className="p-6 bg-secondary rounded-2xl border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Price</p>
                <h2 className="text-4xl font-heading font-bold text-primary">
                  ${painting.price}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground/60 mb-1">By</p>
                <p className="font-semibold text-foreground">{painting.artist}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-foreground/60">Year Created: {painting.year}</p>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
              The Story
            </h3>
            <p className="text-foreground/70 leading-relaxed">{painting.story}</p>
          </motion.div>

          {/* Technical Details */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-4 bg-secondary rounded-xl border border-border">
              <p className="text-xs text-foreground/60 mb-1">Medium</p>
              <p className="font-semibold text-foreground">{painting.medium}</p>
            </div>
            <div className="p-4 bg-secondary rounded-xl border border-border">
              <p className="text-xs text-foreground/60 mb-1">Category</p>
              <p className="font-semibold text-foreground">{painting.category}</p>
            </div>
            <div className="p-4 bg-secondary rounded-xl border border-border">
              <p className="text-xs text-foreground/60 mb-1">Dimensions</p>
              <p className="font-semibold text-foreground">
                {painting.dimensions.width}&quot; × {painting.dimensions.height}&quot;
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-xl border border-border">
              <p className="text-xs text-foreground/60 mb-1">Size</p>
              <p className="font-semibold text-foreground">
                {painting.dimensions.unit === 'inches' ? painting.dimensions.width * 2.54 : painting.dimensions.width}
                {' '}
                {painting.dimensions.unit === 'inches' ? 'cm' : painting.dimensions.unit}
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Link href={`/checkout/${painting.id}`} className="flex-1">
              <motion.button
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-accent transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={painting.availability === 'Sold'}
              >
                {painting.availability === 'Sold' ? 'Sold Out' : 'Buy Now'}
              </motion.button>
            </Link>

            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              className="p-4 border-2 border-border hover:border-primary rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
              />
            </motion.button>

            <motion.button
              className="p-4 border-2 border-border hover:border-primary rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-6 h-6 text-foreground" />
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-foreground/70 mb-2">
              Questions about this piece?
            </p>
            <p className="text-foreground font-semibold">
              Contact us at hello@bloominpaints.com
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Related Paintings */}
      {relatedPaintings.length > 0 && (
        <section className="py-16 px-4 border-t border-border bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl font-heading font-bold text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              More from {painting.category}
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              {relatedPaintings.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/painting/${p.id}`}>
                    <motion.div
                      className="group cursor-pointer"
                      whileHover={{ y: -8 }}
                    >
                      <div className="relative rounded-2xl overflow-hidden h-64 mb-4 bg-secondary">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-heading font-semibold text-foreground hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-primary font-bold text-lg mt-2">${p.price}</p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
