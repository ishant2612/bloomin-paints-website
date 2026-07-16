'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getAllOrders,
  getAllCustomRequests,
  updateOrderStatus,
  updateCustomRequestStatus,
  getPaintings,
  addPainting,
  updatePainting,
  deletePainting,
  getReviewsForApproval,
  approveReview,
  rejectReview,
} from '@/app/actions/painting'
import { formatPrice } from '@/lib/paintings-data'
import { BarChart3, Package, RefreshCw, CheckCircle, Clock, Trash2, Edit, Plus, Eye, EyeOff, DollarSign, TrendingUp } from 'lucide-react'

type Tab = 'overview' | 'orders' | 'requests' | 'paintings' | 'reviews'

interface Order {
  id: string
  fullName: string
  email: string
  totalPrice: number
  status: string
  createdAt: Date
}

interface CustomRequest {
  id: string
  title: string
  basePrice: number
  finalPrice: number
  status: string
  createdAt: Date
}

interface Painting {
  id: string
  title: string
  price: number
  category: string
  availability: string
}

interface Review {
  id: string
  rating: number
  comment: string
  status: string
  authorName: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [orders, setOrders] = useState<Order[]>([])
  const [requests, setRequests] = useState<CustomRequest[]>([])
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [ordersData, requestsData, paintingsData, reviewsData] = await Promise.all([
        getAllOrders(),
        getAllCustomRequests(),
        getPaintings(),
        getReviewsForApproval(),
      ])
      
      setOrders(ordersData as Order[])
      setRequests(requestsData as CustomRequest[])
      setPaintings(paintingsData as Painting[])
      setReviews(reviewsData as Review[])
      
      // Calculate total revenue from delivered orders
      const revenue = ordersData
        .filter((o: any) => o.status === 'delivered')
        .reduce((sum: number, o: any) => sum + o.totalPrice, 0)
      setTotalRevenue(revenue)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
      await loadData()
    } catch (error) {
      console.error('Failed to update order:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleRequestStatusChange = async (requestId: string, newStatus: string) => {
    setUpdatingId(requestId)
    try {
      await updateCustomRequestStatus(requestId, newStatus)
      setRequests(requests.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r)))
    } catch (error) {
      console.error('Failed to update request:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleApproveReview = async (reviewId: string) => {
    setUpdatingId(reviewId)
    try {
      await approveReview(reviewId)
      setReviews(reviews.map((r) => (r.id === reviewId ? { ...r, status: 'approved' } : r)))
    } catch (error) {
      console.error('Failed to approve review:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleRejectReview = async (reviewId: string) => {
    setUpdatingId(reviewId)
    try {
      await rejectReview(reviewId)
      setReviews(reviews.filter((r) => r.id !== reviewId))
    } catch (error) {
      console.error('Failed to reject review:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Pending Requests', value: requests.filter((r) => r.status === 'pending').length, icon: Clock, color: 'bg-orange-100 text-orange-600' },
    { label: 'Pending Reviews', value: reviews.filter((r) => r.status === 'pending').length, icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'confirmed':
        return 'bg-blue-100 text-blue-700'
      case 'paid':
        return 'bg-purple-100 text-purple-700'
      case 'shipped':
        return 'bg-indigo-100 text-indigo-700'
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete control over your marketplace</p>
        </div>
        <button
          onClick={loadData}
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
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
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
      <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
        {(['overview', 'orders', 'requests', 'paintings', 'reviews'] as Tab[]).map((tab) => (
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

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">All Orders</h2>
          {orders.length === 0 ? (
            <div className="bg-secondary rounded-xl p-8 text-center text-muted-foreground">
              No orders yet
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">Order #{order.id.slice(0, 8)}</h3>
                      <p className="text-sm text-muted-foreground">{order.fullName} • {order.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{order.totalPrice.toLocaleString('en-IN')}</div>
                      <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {['pending', 'confirmed', 'paid', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleOrderStatusChange(order.id, status)}
                        disabled={updatingId === order.id}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          order.status === status
                            ? `${getStatusColor(status)} cursor-default`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                        } disabled:opacity-50`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Custom Requests</h2>
          {requests.length === 0 ? (
            <div className="bg-secondary rounded-xl p-8 text-center text-muted-foreground">
              No custom requests yet
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <div key={req.id} className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{req.title}</h3>
                      <p className="text-sm text-muted-foreground">Base: ₹{req.basePrice.toLocaleString('en-IN')} → Final: ₹{req.finalPrice.toLocaleString('en-IN')}</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${getStatusColor(req.status)}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {['pending', 'accepted', 'rejected', 'completed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleRequestStatusChange(req.id, status)}
                        disabled={updatingId === req.id}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          req.status === status
                            ? `${getStatusColor(status)} cursor-default`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                        } disabled:opacity-50`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Paintings Tab */}
      {activeTab === 'paintings' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground">Paintings Gallery</h2>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
              <Plus size={18} />
              Add Painting
            </button>
          </div>

          {paintings.length === 0 ? (
            <div className="bg-secondary rounded-xl p-8 text-center text-muted-foreground">
              No paintings yet
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paintings.map((painting) => (
                <div key={painting.id} className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{painting.title}</h3>
                      <p className="text-sm text-muted-foreground">{painting.category}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${painting.availability === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {painting.availability}
                    </div>
                  </div>

                  <p className="text-2xl font-bold text-primary mb-4">{formatPrice(painting.price)}</p>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                      <Edit size={16} />
                      Edit
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pending Reviews ({reviews.filter((r) => r.status === 'pending').length})</h2>
          {reviews.filter((r) => r.status === 'pending').length === 0 ? (
            <div className="bg-secondary rounded-xl p-8 text-center text-muted-foreground">
              No pending reviews to approve
            </div>
          ) : (
            <div className="space-y-3">
              {reviews
                .filter((r) => r.status === 'pending')
                .map((review) => (
                  <div key={review.id} className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{review.authorName}</h3>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveReview(review.id)}
                        disabled={updatingId === review.id}
                        className="flex-1 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg font-semibold transition-colors disabled:opacity-50"
                      >
                        {updatingId === review.id ? 'Processing...' : 'Approve for Display'}
                      </button>
                      <button
                        onClick={() => handleRejectReview(review.id)}
                        disabled={updatingId === review.id}
                        className="flex-1 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-semibold transition-colors disabled:opacity-50"
                      >
                        {updatingId === review.id ? 'Processing...' : 'Reject'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Approved Reviews for Display</h2>
          {reviews.filter((r) => r.status === 'approved').length === 0 ? (
            <div className="bg-secondary rounded-xl p-8 text-center text-muted-foreground">
              No approved reviews yet
            </div>
          ) : (
            <div className="space-y-3">
              {reviews
                .filter((r) => r.status === 'approved')
                .map((review) => (
                  <div key={review.id} className="bg-white rounded-xl p-6 border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{review.authorName}</h3>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                      <button
                        onClick={() => handleRejectReview(review.id)}
                        disabled={updatingId === review.id}
                        className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-8 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
              <div className="space-y-2">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">#{order.id.slice(0, 6)}</span>
                    <span className="font-semibold text-primary">₹{order.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Status Distribution</h3>
              <div className="space-y-2">
                {['pending', 'confirmed', 'paid', 'shipped', 'delivered', 'cancelled'].map((status) => {
                  const count = orders.filter((o) => o.status === status).length
                  const percentage = orders.length > 0 ? ((count / orders.length) * 100).toFixed(0) : 0
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground capitalize">{status}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              status === 'delivered'
                                ? 'bg-green-500'
                                : status === 'cancelled'
                                  ? 'bg-red-500'
                                  : 'bg-primary'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-8">{count}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
