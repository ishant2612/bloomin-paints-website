'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@bloominpaints.com',
      description: 'For inquiries and custom requests',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Monday to Friday, 10am-6pm EST',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Arts District, New York',
      description: 'Visit our studio by appointment',
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: '24-48 hours',
      description: 'We aim to respond promptly to all inquiries',
    },
  ]

  const faqs = [
    {
      question: 'How do I purchase a painting?',
      answer:
        'Browse our gallery, select a painting you love, and proceed to checkout. We handle shipping worldwide with care to ensure your artwork arrives in perfect condition.',
    },
    {
      question: 'Can I get a custom commission?',
      answer:
        'Yes! We offer custom painting commissions. Contact us with your vision and details, and we&apos;ll create something unique for you.',
    },
    {
      question: 'What are your shipping policies?',
      answer:
        'We ship worldwide with secure, insured packaging. Delivery typically takes 5-10 business days. International orders may take longer depending on location.',
    },
    {
      question: 'Do you offer returns?',
      answer:
        'We accept returns within 30 days if the artwork doesn&apos;t meet your expectations. The painting must be in original condition.',
    },
    {
      question: 'Are there bulk discounts?',
      answer:
        'Yes, we offer discounts for orders of 3+ paintings. Please contact us directly for a quote.',
    },
    {
      question: 'How should I care for my painting?',
      answer:
        'Hang your painting away from direct sunlight to preserve the colors. Use a soft, dry cloth to gently clean the surface. Avoid moisture and temperature fluctuations.',
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
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-lg text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Have questions? We&apos;d love to hear from you. Reach out anytime.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, idx) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-8 bg-white rounded-2xl border border-border text-center hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="font-semibold text-foreground mb-2">{method.value}</p>
                  <p className="text-sm text-foreground/60">{method.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>

              {submitted && (
                <motion.div
                  className="p-4 bg-green-100 text-green-700 rounded-lg text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you! We&apos;ll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                Why Contact Us?
              </h3>
              <ul className="space-y-2 text-foreground/70">
                <li>✓ Custom painting commissions</li>
                <li>✓ Bulk orders and corporate inquiries</li>
                <li>✓ Shipping and delivery questions</li>
                <li>✓ Print and licensing requests</li>
                <li>✓ Collaboration opportunities</li>
                <li>✓ Studio visits by appointment</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-2xl border-2 border-primary/20">
              <h4 className="font-heading font-semibold text-foreground mb-2">Business Hours</h4>
              <p className="text-foreground/70">
                <span className="block">Monday - Friday: 10:00 AM - 6:00 PM EST</span>
                <span className="block">Saturday: 12:00 PM - 4:00 PM EST</span>
                <span className="block">Sunday: Closed</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-heading font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, idx) => (
              <motion.details
                key={idx}
                variants={itemVariants}
                className="group p-6 bg-white rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <summary className="flex items-center justify-between font-heading font-semibold text-foreground">
                  <span>{faq.question}</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-foreground/70 leading-relaxed">{faq.answer}</p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl mx-4 mb-16">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-foreground/70 mb-6">
            Subscribe to our newsletter for new releases, special offers, and artist stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <motion.button
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
