'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { paintings } from '@/lib/paintings-data'
import { ChevronRight, Package } from 'lucide-react'
import { createOrder } from '@/app/actions/painting'
import crypto from 'crypto'

export default function Checkout() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const painting = paintings.find((p) => p.id === id)

  const [step, setStep] = useState<'form' | 'summary' | 'success'>('form')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  if (!painting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Painting Not Found
          </h1>
          <p className="text-foreground/70">The painting you&apos;re trying to purchase doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.pincode
    ) {
      setStep('summary')
    }
  }

  const handleConfirmOrder = async () => {
    try {
      // Generate unique order ID
      const orderId = `ORD-${crypto.randomUUID().split('-')[0].toUpperCase()}-${Date.now()}`
      
      console.log('[v0] Creating order with ID:', orderId)
      console.log('[v0] Form data:', formData)
      
      // Create order in database
      const result = await createOrder({
        paintingId: id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        totalPrice: painting.price,
        orderId,
      })
      
      console.log('[v0] Order created successfully:', result)
      
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep('success')
    } catch (error: any) {
      console.error('[v0] Order creation failed:', error)
      console.error('[v0] Error message:', error?.message)
      console.error('[v0] Error details:', JSON.stringify(error, null, 2))
      alert(`Failed to create order: ${error?.message || 'Unknown error'}`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb & Progress */}
      <div className="bg-gradient-to-b from-secondary/30 to-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="text-foreground/70">Checkout</span>
              <ChevronRight className="w-4 h-4 text-foreground/50" />
              <span className="text-foreground/70">
                {step === 'form' && 'Delivery Information'}
                {step === 'summary' && 'Order Summary'}
                {step === 'success' && 'Confirmation'}
              </span>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="flex gap-2">
            {['form', 'summary', 'success'].map((s, idx) => (
              <motion.div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  (step === 'form' && idx === 0) ||
                  (step === 'summary' && idx <= 1) ||
                  (step === 'success' && idx <= 2)
                    ? 'bg-primary'
                    : 'bg-border'
                }`}
                animate={{
                  backgroundColor:
                    (step === 'form' && idx === 0) ||
                    (step === 'summary' && idx <= 1) ||
                    (step === 'success' && idx <= 2)
                      ? '#d4a574'
                      : '#e8e4df',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order Summary (Sidebar) */}
          <motion.div
            className="lg:col-span-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="sticky top-24 p-6 bg-secondary rounded-2xl border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4">Your Order</h3>

              {/* Painting Card */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                  <Image
                    src={painting.image}
                    alt={painting.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1">{painting.title}</h4>
                <p className="text-xs text-foreground/60">{painting.dimensions.width}&quot; × {painting.dimensions.height}&quot;</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-foreground">
                  <span>Artwork</span>
                  <span className="font-semibold">${painting.price}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold">$50</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax</span>
                  <span className="font-semibold">${Math.round((painting.price + 50) * 0.08)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-heading font-semibold text-foreground">Total</span>
                  <span className="text-3xl font-heading font-bold text-primary">
                    ${painting.price + 50 + Math.round((painting.price + 50) * 0.08)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {step === 'form' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Delivery Information
                  </h2>
                  <p className="text-foreground/70">
                    Please provide your delivery address for this beautiful artwork.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Complete Delivery Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="New York"
                    />
                  </div>

                  {/* State & Pincode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  >
                    Back
                  </button>
                  <motion.button
                    onClick={handleNextStep}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Review Order
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'summary' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Order Summary
                  </h2>
                  <p className="text-foreground/70">
                    Please review your information before confirming.
                  </p>
                </div>

                {/* Delivery Info Card */}
                <div className="p-6 bg-white rounded-2xl border border-border">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Delivery Address
                  </h3>
                  <div className="space-y-2 text-foreground/80">
                    <p className="font-semibold">{formData.fullName}</p>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.state} {formData.pincode}
                    </p>
                    <p className="pt-2 border-t border-border text-sm">
                      Email: {formData.email}
                    </p>
                    <p className="text-sm">Phone: {formData.phone}</p>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="p-6 bg-secondary rounded-2xl border border-border flex gap-4">
                  <Package className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">
                      Secure Shipping
                    </h4>
                    <p className="text-sm text-foreground/70">
                      Your painting will be carefully packaged and shipped with full insurance.
                      Delivery typically takes 5-10 business days.
                    </p>
                  </div>
                </div>

                {/* Important Note */}
                <div className="p-4 bg-blue-100/50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900 font-medium">
                    After you confirm this order, our artist will contact you within 24 hours to confirm
                    payment and shipping details. This allows us to ensure the safest delivery for your
                    precious artwork.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    onClick={() => setStep('form')}
                    className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit Details
                  </motion.button>
                  <motion.button
                    onClick={handleConfirmOrder}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm Order
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ scale: [0.9, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-4xl">✓</span>
                </motion.div>

                <h2 className="text-4xl font-heading font-bold text-foreground mb-3">
                  Order Confirmed!
                </h2>
                <p className="text-lg text-foreground/70 mb-8 max-w-md mx-auto">
                  Thank you for your purchase. We&apos;re thrilled you&apos;re taking home a Bloomin Paints
                  masterpiece!
                </p>

                <div className="bg-secondary p-8 rounded-2xl border border-border mb-8 text-left max-w-md mx-auto">
                  <h3 className="font-heading font-semibold text-foreground mb-4">What Happens Next?</h3>
                  <ol className="space-y-3 text-sm text-foreground/70">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold flex-shrink-0">1</span>
                      <span>Our artist will contact you within 24 hours via email or phone to confirm payment</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold flex-shrink-0">2</span>
                      <span>We&apos;ll arrange the final details for shipping your artwork</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold flex-shrink-0">3</span>
                      <span>Your painting will be carefully packaged and shipped within 5-7 business days</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold flex-shrink-0">4</span>
                      <span>You&apos;ll receive tracking information for your shipment</span>
                    </li>
                  </ol>
                </div>

                <motion.a
                  href="/gallery"
                  className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
