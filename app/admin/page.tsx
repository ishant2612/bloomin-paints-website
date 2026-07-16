'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import AdminDashboard from '@/components/admin-dashboard'

export default function AdminPage() {
  const session = useSession()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session.isPending) {
      return
    }

    if (!session.data?.user) {
      router.push('/sign-in')
      return
    }

    const userRole = (session.data?.user as any)?.role || 'buyer'
    console.log('[v0] Current user role:', userRole)
    
    if (userRole !== 'admin') {
      console.log('[v0] User is not admin, redirecting to home')
      router.push('/')
      return
    }

    console.log('[v0] Admin user authorized')
    setIsAuthorized(true)
    setLoading(false)
  }, [session, router])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-primary rounded-full"></div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!isAuthorized) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-destructive mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You do not have permission to access this page.</p>
          </div>
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
