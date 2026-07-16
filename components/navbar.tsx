'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut } from 'lucide-react'
import { useSession, signOut } from '@/lib/auth-client'
import { getCurrentUserRole } from '@/app/actions/painting'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const session = useSession()

  useEffect(() => {
    if (session.data?.user && !session.isPending) {
      getCurrentUserRole().then((role) => {
        console.log('[v0] Navbar - fetched user role:', role)
        setUserRole(role)
      }).catch(err => {
        console.error('[v0] Navbar - failed to fetch role:', err)
        setUserRole('buyer')
      })
    }
  }, [session.data?.user, session.isPending])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/custom-request', label: 'Custom Request', auth: true },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary-foreground font-heading text-lg font-bold">B</span>
            </motion.div>
            <span className="hidden sm:block font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              Bloomin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              // Skip auth-required links if not logged in
              if (link.auth && !session.data?.user) return null
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-body text-sm font-medium transition-colors relative group"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"
                    layoutId={`underline-${link.href}`}
                  />
                </Link>
              )
            })}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {session.data?.user ? (
              <>
                {userRole === 'admin' && (
                  <Link
                    href="/admin"
                    className="hidden sm:block px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/account"
                  className="hidden sm:block text-foreground/80 hover:text-primary font-body text-sm font-medium transition-colors"
                >
                  My Account
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-foreground/80 hover:text-primary font-body text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => {
                  if (link.auth && !session.data?.user) return null
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                })}
                {session.data?.user && (
                  <>
                    {userRole === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-medium transition-colors"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/account"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                )}
                {!session.data?.user && (
                  <div className="px-4 py-2 space-y-2 border-t border-border mt-2 pt-4">
                    <Link
                      href="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-center text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
