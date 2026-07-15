'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PaintingCard from '@/components/painting-card'
import { paintings } from '@/lib/paintings-data'
import { ArrowRight, Sparkles, Heart, Palette } from 'lucide-react'

export default function Home() {
  const featuredPaintings = paintings.slice(0, 6)
  const testimonials = [
    {
      id: 1,
      name: 'Emma Richardson',
      role: 'Art Collector',
      text: 'The quality and emotional depth of these paintings is extraordinary. Each piece tells a beautiful story.',
      avatar: '👩‍🎨',
    },
    {
      id: 2,
      name: 'James Mitchell',
      role: 'Interior Designer',
      text: 'I regularly recommend Bloomin Paints to my clients. The craftsmanship is unmatched.',
      avatar: '👨‍💼',
    },
    {
      id: 3,
      name: 'Sofia Chen',
      role: 'Gallery Owner',
      text: 'Working with these artists has been a joy. Their passion translates directly into their work.',
      avatar: '👩‍🔬',
    },
  ]

  const whyChoose = [
    {
      icon: Palette,
      title: 'Original Artistry',
      description: 'Each painting is handmade with intention and passion by skilled artists.',
    },
    {
      icon: Heart,
      title: 'Authentic Stories',
      description: 'Every artwork comes with a meaningful story about its creation and inspiration.',
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'We use only the finest materials and techniques to ensure lasting beauty.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full border border-border"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80">Discover Original Art</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Where Every Brushstroke{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blooms into a Story
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-foreground/70 font-body max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Discover and collect handmade paintings from talented independent artists. Each piece carries emotion, craftsmanship, and timeless beauty.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link href="/gallery">
                <motion.button
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center gap-2 hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Gallery
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn About Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Art Preview */}
          <motion.div
            className="mt-16 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=600&h=600&fit=crop)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent" />
            </div>

            {/* Floating cards */}
            <motion.div
              className="absolute -top-4 -left-4 w-32 h-40 bg-white rounded-2xl shadow-lg p-3 border border-border"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-xs font-semibold text-foreground">Featured</p>
              <p className="text-xs text-foreground/60">Morning Bloom</p>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-white rounded-2xl shadow-lg p-3 border border-border"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <p className="text-2xl mb-2">⭐</p>
              <p className="text-xs font-semibold text-foreground">Rating</p>
              <p className="text-xs text-foreground/60">4.9/5 from collectors</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Featured Collection
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Curated masterpieces from our most talented artists, celebrating creativity and craftsmanship.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredPaintings.map((painting) => (
              <motion.div key={painting.id} variants={itemVariants}>
                <PaintingCard painting={painting} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/gallery">
              <motion.button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Paintings
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Original Art */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Why Choose Original Art?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Experience the difference that authentic artistry brings to your space and life.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyChoose.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-8 rounded-2xl bg-gradient-to-br from-secondary/50 to-background border border-border hover:border-primary/50 transition-colors"
                  whileHover={{ y: -8 }}
                >
                  <div className="mb-4">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Loved by Art Collectors
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Hear from collectors who&apos;ve found their favorite pieces with us.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="p-8 bg-white rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-background border-2 border-primary/20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Ready to Start Your Collection?
            </motion.h2>
            <motion.p
              className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Explore hundreds of handmade paintings and find the perfect piece for your home or collection.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/gallery">
                <motion.button
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Gallery Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
