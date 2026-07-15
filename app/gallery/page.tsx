'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PaintingCard } from '@/components/painting-card'
import { paintings, PaintingCategory } from '@/lib/paintings-data'
import { Search, Grid, Zap } from 'lucide-react'

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<PaintingCategory[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])

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
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const filteredPaintings = useMemo(() => {
    return paintings.filter((painting) => {
      const matchesSearch =
        painting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        painting.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(painting.category)

      const matchesPrice = painting.price >= priceRange[0] && painting.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchTerm, selectedCategories, priceRange])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-secondary/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-2">
              Art Gallery
            </h1>
            <p className="text-lg text-foreground/70">
              Discover our curated collection of {paintings.length} original paintings
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    placeholder="Search paintings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategories.includes(category)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80 text-foreground'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-foreground/70">
                      Min: ${priceRange[0]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/70">
                      Max: ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategories.length > 0 || searchTerm) && (
                <motion.button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategories([])
                    setPriceRange([0, 1500])
                  }}
                  className="w-full px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Results Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-foreground/70">
                <Grid className="w-5 h-5" />
                <span className="font-medium">
                  {filteredPaintings.length} painting{filteredPaintings.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Grid */}
            <AnimatePresence>
              {filteredPaintings.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPaintings.map((painting) => (
                    <motion.div key={painting.id} variants={itemVariants} layout>
                      <PaintingCard painting={painting} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="col-span-full py-20 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-4 text-5xl">🎨</div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
                    No paintings found
                  </h3>
                  <p className="text-foreground/70">
                    Try adjusting your filters or search terms
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
