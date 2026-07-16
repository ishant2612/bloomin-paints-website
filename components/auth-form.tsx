'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp, signIn } from '@/lib/auth-client'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'buyer' | 'admin'>('buyer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'sign-up') {
        try {
          await signUp.email(
            {
              email,
              password,
              name,
            },
            {
              onSuccess: () => {
                // For demo purposes, default to buyer role
                // Admin can be set from database manually
                router.push('/')
                router.refresh()
              },
              onError: (ctx) => {
                setError(ctx.error.message || 'Failed to sign up')
              },
            }
          )
        } catch (err) {
          setError('Failed to sign up. Please try again.')
        }
      } else {
        await signIn.email(
          {
            email,
            password,
          },
          {
            onSuccess: async () => {
              // Redirect to home by default
              // Admin redirection will be checked on admin page
              router.push('/')
              router.refresh()
            },
            onError: (ctx) => {
              setError(ctx.error.message || 'Failed to sign in')
            },
          }
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {mode === 'sign-up' && (
        <>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-foreground mb-1">
              Account Type (Demo)
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'buyer' | 'admin')}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
            >
              <option value="buyer">Buyer - Purchase Paintings</option>
              <option value="admin">Admin - Manage Store (Set role in DB after signup)</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Note: For demo, manually set your role to 'admin' in the database after signing up, then refresh.
            </p>
          </div>
        </>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
          required
          minLength={8}
        />
      </div>

      {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Loading...' : mode === 'sign-in' ? 'Sign In' : 'Create Account'}
      </button>

      <div className="text-center text-sm">
        {mode === 'sign-in' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </>
        )}
      </div>
    </motion.form>
  )
}
