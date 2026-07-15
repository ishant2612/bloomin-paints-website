'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getAllOrders,
  getAllCustomRequests,
  updateOrderStatus,
  updateCustomRequestStatus,
  getPaintings,
} from '@/app/actions/painting'
import { formatPrice } from '@/lib/paintings-data'
import { BarChart3, Package, RefreshCw, CheckCircle, Clock } from 'lucide-react'

type Tab = 'overview' | 'orders' | 'requests' | 'paintings'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [orders, setOrders] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [paintings, setPaintings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [ordersData, requestsData, paintingsData] = await Promise.all([
          getAllOrders(),
          getAllCustomRequests(),
          getPaintings(),
        ])
        setOrders(ordersData)
        setRequests(requestsData)
        setPaintings(paintingsData)
      } catch (error) {
        console.error('Failed to load admin data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Paintings', value: paintings.length, icon: BarChart3, color: 'bg-purple-100 text-purple-600' },
    { label: 'Pending Requests', value: requests.filter((r) => r.status === 'pending').length, icon: Clock, color: 'bg-orange-100 text-orange-600' },
    { label: 'Completed Orders', value: orders.filter((o) => o.status === 'delivered').length, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
  ]

  const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    } catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  const handleRequestStatusChange = async (requestId: string, newStatus: string) => {
    try {
      await updateCustomRequestStatus(requestId, newStatus)
      setRequests(requests.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r)))
    } catch (error) {
      console.error('Failed to update request:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage paintings, orders, and custom requests</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
        {(['overview', 'orders', 'requests', 'paintings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : activeTab === 'overview' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
              <p className="text-muted-foreground">Last 5 orders</p>
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="mt-3 p-3 bg-white rounded-lg border border-border text-sm">
                  <p className="font-semibold text-foreground">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-muted-foreground">₹{order.totalPrice.toLocaleString('en-IN')} - {order.status}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : activeTab === 'orders' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground">{order.fullName} • {order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {['pending', 'confirmed', 'paid', 'shipped', 'delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleOrderStatusChange(order.id, status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        order.status === status
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted-foreground/20 text-muted-foreground'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : activeTab === 'requests' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{request.title}</h3>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{request.finalPrice.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground mt-1">(Base: ₹{request.basePrice.toLocaleString('en-IN')})</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-4">
                  {['pending', 'accepted', 'rejected', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleRequestStatusChange(request.id, status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        request.status === status
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted-foreground/20 text-muted-foreground'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {request.artistNotes && (
                  <div className="text-sm bg-secondary p-3 rounded-lg">
                    <p className="font-semibold text-foreground mb-1">Artist Notes:</p>
                    <p className="text-muted-foreground">{request.artistNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <p className="text-muted-foreground">Manage paintings from the gallery page.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paintings.map((painting) => (
                <div key={painting.id} className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <img
                    src={painting.image}
                    alt={painting.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground truncate">{painting.title}</h3>
                    <p className="text-primary font-bold">{formatPrice(painting.price)}</p>
                    <p className={`text-xs font-semibold mt-2 ${painting.availability === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                      {painting.availability === 'available' ? 'Available' : 'Sold'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
