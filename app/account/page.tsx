'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  getUserOrders,
  getUserCustomRequests,
  cancelOrder,
  getOrderReview,
} from '@/app/actions/painting'

interface OrderItem {
  id: string
  fullName: string
  totalPrice: number
  status: string
  createdAt: Date
  paintingId?: string | null
}

interface CustomRequestItem {
  id: string
  title: string
  basePrice: number
  finalPrice: number
  status: string
  createdAt: Date
}

export default function AccountPage() {
  const session = useSession()
  const [tab, setTab] = useState<'orders' | 'requests'>('orders')
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [requests, setRequests] = useState<CustomRequestItem[]>([])
  const [loading, setLoading] = useState(true)
  const [canceling, setCanceling] = useState<string | null>(null)

  useEffect(() => {
    if (!session.isPending && !session.data?.user) {
      redirect('/sign-in')
    }
  }, [session])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [ordersData, requestsData] = await Promise.all([
          getUserOrders(),
          getUserCustomRequests(),
        ])
        setOrders(ordersData as OrderItem[])
        setRequests(requestsData as CustomRequestItem[])
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session.data?.user && !session.isPending) {
      loadData()
    }
  }, [session.data?.user, session.isPending])

  const handleCancelOrder = async (orderId: string) => {
    setCanceling(orderId)
    try {
      await cancelOrder(orderId)
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o)))
    } catch (error) {
      console.error('Failed to cancel order:', error)
    } finally {
      setCanceling(null)
    }
  }

  if (session.isPending || loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">My Account</h1>
              <p className="text-muted-foreground">Welcome back, {session.data?.user?.name}</p>
            </div>
            <Link
              href="/custom-request"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              New Request
            </Link>
          </div>

          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setTab('orders')}
              className={`px-4 py-3 font-semibold transition-colors ${
                tab === 'orders'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              My Orders ({orders.length})
            </button>
            <button
              onClick={() => setTab('requests')}
              className={`px-4 py-3 font-semibold transition-colors ${
                tab === 'requests'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Custom Requests ({requests.length})
            </button>
          </div>

          {tab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-secondary rounded-xl p-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
                  <Link href="/gallery" className="text-primary hover:underline font-semibold">
                    Browse our gallery
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">Order #{order.id.slice(0, 8)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ₹{order.totalPrice.toLocaleString('en-IN')}
                        </div>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">Recipient: {order.fullName}</p>

                    <div className="flex gap-3">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={canceling === order.id}
                          className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors disabled:opacity-50"
                        >
                          {canceling === order.id ? 'Canceling...' : 'Cancel Order'}
                        </button>
                      )}
                      <Link href={`/order/${order.id}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {tab === 'requests' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {requests.length === 0 ? (
                <div className="bg-secondary rounded-xl p-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven&apos;t submitted any custom requests yet.</p>
                  <Link href="/custom-request" className="text-primary hover:underline font-semibold">
                    Create a custom request
                  </Link>
                </div>
              ) : (
                requests.map((req) => (
                  <div key={req.id} className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{req.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Requested: {new Date(req.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">
                          ₹{req.finalPrice.toLocaleString('en-IN')}
                        </div>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                            req.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : req.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : req.status === 'accepted'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Base: ₹{req.basePrice.toLocaleString('en-IN')} (with 30% markup)</p>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
