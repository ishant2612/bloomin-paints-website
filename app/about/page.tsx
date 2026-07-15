'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Palette, Sparkles, Heart, Award } from 'lucide-react'

export default function About() {
  const milestones = [
    { year: '2020', title: 'Founded', description: 'Started Bloomin Paints with a vision to showcase original art' },
    { year: '2021', title: 'First Exhibition', description: 'Hosted the inaugural exhibition featuring 50+ paintings' },
    { year: '2022', title: 'Global Reach', description: 'Shipped paintings to 25+ countries worldwide' },
    { year: '2024', title: 'Community', description: 'Built a thriving community of 1000+ collectors' },
  ]

  const values = [
    {
      icon: Palette,
      title: 'Authentic Artistry',
      description: 'We celebrate genuine creativity and handmade excellence in every piece.',
    },
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'Every painting is created with passion, purpose, and personal vision.',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Premium materials and meticulous craftsmanship in every artwork.',
    },
    {
      icon: Sparkles,
      title: 'Timeless Beauty',
      description: 'Creating pieces that stand the test of time and inspire generations.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About Bloomin Paints
          </motion.h1>
          <motion.p
            className="text-lg text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Celebrating creativity, craftsmanship, and the stories behind every brushstroke.
          </motion.p>
        </div>
      </section>

      {/* Artist Story */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop"
                alt="Artist at work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent" />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                  Our Story
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  Bloomin Paints was born from a simple belief: original art matters. In a world of
                  mass production, we celebrate the unique voice of independent artists and the
                  emotional depth that only handmade paintings can convey.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  What started as a passion project has blossomed into a thriving community of
                  collectors and creators united by a love of authentic artistry. Each painting tells
                  a story—of inspiration, technique, and the artist&apos;s soul.
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-foreground/60 text-sm mb-3">Founded in 2020 by artists for artists</p>
                <div className="flex flex-wrap gap-3">
                  {['Original', 'Authentic', 'Handmade', 'Premium'].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-foreground/70">
              What drives everything we do at Bloomin Paints
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-8 bg-white rounded-2xl border border-border hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-heading font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h2>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex gap-6 pb-8 border-b border-border last:border-0"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
                    <span className="text-primary-foreground font-heading font-bold text-sm text-center">
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-foreground/70">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Creative Process */}
      <section className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-heading font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Creative Process
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { step: '01', title: 'Inspiration', text: 'Artists draw from personal experiences and observations.' },
              { step: '02', title: 'Sketching', text: 'Initial concepts are sketched and refined.' },
              { step: '03', title: 'Creation', text: 'Using premium materials, the painting comes to life.' },
              { step: '04', title: 'Reflection', text: 'Each piece is completed with intention and care.' },
            ].map((phase, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center p-6 rounded-2xl bg-white border border-border hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-heading font-bold text-primary mb-2">
                  {phase.step}
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{phase.title}</h3>
                <p className="text-sm text-foreground/70">{phase.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5 border-2 border-primary/20 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Discover Your Next Favorite Piece
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Explore our collection of original paintings and support independent artists.
          </p>
          <motion.a
            href="/gallery"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-accent transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Gallery
          </motion.a>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
