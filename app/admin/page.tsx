'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { paintings } from '@/lib/paintings-data'
import {
  BarChart3,
  Plus,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  Search,
  Filter,
  TrendingUp,
  Package,
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'paintings' | 'orders'>('overview')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // Mock data
  const stats = [
    { label: 'Total Artworks', value: paintings.length, icon: BarChart3 },
    { label: 'Available', value: paintings.filter((p) => p.availability === 'Available').length, icon: Eye },
    { label: 'Sold', value: paintings.filter((p) => p.availability === 'Sold').length, icon: Package },
    { label: 'Total Revenue', value: '$48,500', icon: TrendingUp },
  ]

  const mockOrders = [
    {
      id: 'ORD-001',
      painting: 'Morning Bloom',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      price: 850,
      status: 'Pending',
      date: '2024-07-14',
      address: '123 Main St, New York, NY 10001',
    },
    {
      id: 'ORD-002',
      painting: 'Celestial Dreams',
      customer: 'James Chen',
      email: 'james@example.com',
      price: 720,
      status: 'Confirmed',
      date: '2024-07-13',
      address: '456 Oak Ave, Los Angeles, CA 90001',
    },
    {
      id: 'ORD-003',
      painting: 'Garden Sanctuary',
      customer: 'Emma Davis',
      email: 'emma@example.com',
      price: 680,
      status: 'Shipped',
      date: '2024-07-12',
      address: '789 Pine Rd, Chicago, IL 60601',
    },
    {
      id: 'ORD-004',
      painting: 'Mountain Silence',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      price: 1100,
      status: 'Delivered',
      date: '2024-07-11',
      address: '321 Elm St, Houston, TX 77001',
    },
  ]

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Confirmed: 'bg-blue-100 text-blue-700',
    Paid: 'bg-indigo-100 text-indigo-700',
    Shipped: 'bg-purple-100 text-purple-700',
    Delivered: 'bg-green-100 text-green-700',
  }

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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Admin Dashboard
            </h1>
            {activeTab === 'paintings' && (
              <motion.button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Add Painting
              </motion.button>
            )}
          </div>
          <p className="text-foreground/70">Manage your artwork, orders, and gallery</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex gap-2 mb-8 border-b border-border pb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {(['overview', 'paintings', 'orders'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold transition-colors relative ${
                activeTab === tab ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
              }`}
              whileHover={{ color: '#d4a574' }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="tab-underline"
                  transition={{ type: 'spring', damping: 20 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        <AnimatePresence>
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat, idx) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="p-6 bg-white rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                        <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                          +12%
                        </span>
                      </div>
                      <p className="text-foreground/70 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-heading font-bold text-foreground">{stat.value}</p>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                className="p-8 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl border border-border"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Add New Painting', action: 'paintings' },
                    { label: 'View Orders', action: 'orders' },
                    { label: 'View Gallery', href: '/gallery' },
                  ].map((action, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => action.action && setActiveTab(action.action as any)}
                      className="p-4 bg-white rounded-lg border border-border hover:border-primary hover:shadow-md transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="font-semibold text-foreground">{action.label}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Recent Orders
                </h3>
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-secondary border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                            Order
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                            Customer
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                            Painting
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.slice(0, 4).map((order) => (
                          <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                            <td className="px-6 py-4 text-sm font-semibold text-foreground">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-foreground/70">{order.customer}</td>
                            <td className="px-6 py-4 text-sm text-foreground/70">{order.painting}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-foreground">
                              ${order.price}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  statusColors[order.status as keyof typeof statusColors]
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paintings Tab */}
        <AnimatePresence>
          {activeTab === 'paintings' && (
            <motion.div
              key="paintings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Search & Filter */}
              <div className="flex gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    placeholder="Search paintings..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="px-4 py-2 bg-white border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>

              {/* Paintings Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {paintings.map((painting) => (
                  <motion.div
                    key={painting.id}
                    variants={itemVariants}
                    className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-secondary">
                      <Image
                        src={painting.image}
                        alt={painting.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <button className="p-2 bg-white rounded-lg hover:bg-secondary transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4 className="font-heading font-semibold text-foreground mb-1 line-clamp-1">
                        {painting.title}
                      </h4>
                      <p className="text-sm text-foreground/60 mb-3 line-clamp-2">
                        {painting.description}
                      </p>

                      <div className="space-y-2 mb-4 text-sm text-foreground/70">
                        <div className="flex justify-between">
                          <span>Price</span>
                          <span className="font-semibold">${painting.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status</span>
                          <span
                            className={`font-semibold ${
                              painting.availability === 'Available'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {painting.availability}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <motion.button
                          className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </motion.button>
                        <motion.button
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orders Tab */}
        <AnimatePresence>
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary border-b border-border">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Order ID
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Painting
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <motion.tr
                          key={order.id}
                          className="border-b border-border hover:bg-secondary/50 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground/70">{order.customer}</td>
                          <td className="px-6 py-4 text-sm text-foreground/70">{order.painting}</td>
                          <td className="px-6 py-4 text-sm text-foreground/70">{order.date}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">
                            ${order.price}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                statusColors[order.status as keyof typeof statusColors]
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <motion.button
                              onClick={() => {
                                setSelectedOrder(order)
                                setShowOrderDetails(true)
                              }}
                              className="text-primary hover:text-accent font-semibold text-sm"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              View
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Painting Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Add New Painting</h2>

              <div className="space-y-4">
                {['Title', 'Description', 'Story', 'Price', 'Category', 'Medium', 'Dimensions', 'Upload Image'].map(
                  (field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        {field}
                      </label>
                      {field === 'Story' || field === 'Description' ? (
                        <textarea className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      ) : field === 'Upload Image' ? (
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                          <p className="text-foreground/70 text-sm">Click to upload image</p>
                        </div>
                      ) : (
                        <input
                          type={field === 'Price' ? 'number' : 'text'}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={`Enter ${field.toLowerCase()}`}
                        />
                      )}
                    </div>
                  )
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <motion.button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Painting
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOrderDetails(false)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Order Details</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60">Order ID</p>
                  <p className="font-semibold text-foreground">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Customer</p>
                  <p className="font-semibold text-foreground">{selectedOrder.customer}</p>
                  <p className="text-sm text-foreground/70">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Delivery Address</p>
                  <p className="text-sm text-foreground/70">{selectedOrder.address}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Painting</p>
                  <p className="font-semibold text-foreground">{selectedOrder.painting}</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-foreground/60">Current Status</p>
                  <div className="mt-2 space-y-2">
                    {['Pending', 'Confirmed', 'Paid', 'Shipped', 'Delivered'].map((status) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          defaultChecked={status === selectedOrder.status}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-foreground">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <motion.button
                  onClick={() => setShowOrderDetails(false)}
                  className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
