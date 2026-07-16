'use client'

import { useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function PostLogin() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.isPending) return

    if (!session.data?.user) {
      router.push('/sign-in')
      return
    }

    const userRole = (session.data?.user as any)?.role || 'buyer'
    console.log('[v0] Post-login check - user role:', userRole)

    // Redirect based on role
    if (userRole === 'admin') {
      console.log('[v0] Redirecting admin to dashboard')
      router.push('/admin')
    } else {
      console.log('[v0] Redirecting buyer to home')
      router.push('/')
    }
  }, [session, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-primary rounded-full animate-pulse mx-auto mb-4"></div>
        <p className="text-foreground/70">Redirecting...</p>
      </div>
    </div>
  )
}
