'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin-dashboard'

export default function AdminPage() {
  const session = useSession()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session.isPending) return

    if (!session.data?.user) {
      redirect('/sign-in')
    }

    const userRole = (session.data?.user as any)?.role || 'buyer'
    if (userRole !== 'admin') {
      redirect('/')
    }

    setIsAuthorized(true)
    setLoading(false)
  }, [session])

  if (loading || !isAuthorized) {
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
        <AdminDashboard />
      </main>
      <Footer />
    </>
  )
}
