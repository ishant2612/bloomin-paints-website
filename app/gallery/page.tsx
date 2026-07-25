'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PaintingCard from '@/components/painting-card'
import { Search, Grid } from 'lucide-react'

type PaintingCategory =
  | 'Landscape'
  | 'Abstract'
  | 'Portrait'
  | 'Nature'
  | 'Floral'
  | 'Animals'
  | 'Still Life'
  | 'Urban'

type Painting = {
  id: string
  title: string
  description: string
  story: string
  price: number
  category: PaintingCategory
  medium: string
  dimensions: { width: number; height: number; unit: string } | string
  availability: 'Available' | 'Sold'
  image: string
}

export default function Gallery() {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<PaintingCategory[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])

  useEffect(() => {
    async function fetchPaintings() {
      try {
        const res = await fetch('/api/paintings')
        if (!res.ok) throw new Error('Failed to fetch paintings')
        const data = await res.json()
        setPaintings(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchPaintings()
  }, [])

  const categories: PaintingCategory[] = [
    'Landscape',
    'Abstract',
    'Portrait',
    'Nature',
    'Floral',
    'Animals',
    'Still Life',
    'Urban',
  ]

  const toggleCategory = (category: PaintingCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const filteredPaintings = useMemo(() => {
    return paintings.filter((painting) => {
      const matchesSearch =
        painting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        painting.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(painting.category)

      const matchesPrice =
        painting.price >= priceRange[0] &&
        painting.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [paintings, searchTerm, selectedCategories, priceRange])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading paintings...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-12 px-4 bg-gradient-to-b from-secondary/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-2">
            Art Gallery
          </h1>
          <p className="text-lg text-foreground/70">
            Discover our curated collection of {paintings.length} original paintings
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-semibold mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 bg-secondary border rounded-lg"
                    placeholder="Search paintings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className="w-full text-left px-4 py-2 rounded-lg bg-secondary"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-8">
              <Grid className="w-5 h-5" />
              <span>{filteredPaintings.length} paintings</span>
            </div>

            <AnimatePresence>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPaintings.map((painting) => (
                  <motion.div key={painting.id} variants={itemVariants}>
                    <PaintingCard painting={painting as any} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
