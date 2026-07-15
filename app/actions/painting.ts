'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { painting, customRequest, order, review } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

const uuidv4 = () => crypto.randomUUID()

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

async function getUserRole() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return (session.user as any)?.role || 'buyer'
}

// Paintings
export async function getPaintings() {
  return db.select().from(painting).orderBy(desc(painting.createdAt))
}

export async function getPaintingById(id: string) {
  const result = await db.select().from(painting).where(eq(painting.id, id))
  return result[0]
}

export async function addPainting(data: {
  title: string
  description: string
  story: string
  image: string
  price: number
  category: string
  medium: string
  dimensions: string
}) {
  const role = await getUserRole()
  if (role !== 'admin') throw new Error('Only admins can add paintings')

  const id = uuidv4()
  await db.insert(painting).values({
    id,
    ...data,
    availability: 'available',
  })
  revalidatePath('/gallery')
  return id
}

export async function updatePainting(
  id: string,
  data: Partial<{
    title: string
    description: string
    story: string
    image: string
    price: number
    category: string
    medium: string
    dimensions: string
    availability: string
  }>
) {
  const role = await getUserRole()
  if (role !== 'admin') throw new Error('Only admins can update paintings')

  await db.update(painting).set(data).where(eq(painting.id, id))
  revalidatePath('/gallery')
  revalidatePath(`/painting/${id}`)
}

export async function deletePainting(id: string) {
  const role = await getUserRole()
  if (role !== 'admin') throw new Error('Only admins can delete paintings')

  await db.delete(painting).where(eq(painting.id, id))
  revalidatePath('/gallery')
}

// Custom Requests
export async function createCustomRequest(data: {
  title: string
  description: string
  imageUrl: string
  specifications: string
  basePrice: number
}) {
  const userId = await getUserId()
  const id = uuidv4()
  const finalPrice = Math.round(data.basePrice * 1.3)

  await db.insert(customRequest).values({
    id,
    userId,
    ...data,
    finalPrice,
    status: 'pending',
  })
  revalidatePath('/account')
  return id
}

export async function getUserCustomRequests() {
  const userId = await getUserId()
  return db
    .select()
    .from(customRequest)
    .where(eq(customRequest.userId, userId))
    .orderBy(desc(customRequest.createdAt))
}

export async function getAllCustomRequests() {
  const role = await getUserRole()
  if (role !== 'admin') throw new Error('Only admins can view all custom requests')

  return db.select().from(customRequest).orderBy(desc(customRequest.createdAt))
}

export async function updateCustomRequestStatus(
  id: string,
  status: string,
  artistNotes?: string
) {
  const role = await getUserRole()
  if (role !== 'admin') throw new Error('Only admins can update custom requests')

  await db
    .update(customRequest)
    .set({ status, artistNotes })
    .where(eq(customRequest.id, id))

  revalidatePath('/account')
}

// Orders
export async function createOrder(data: {
  paintingId?: string
  customRequestId?: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  totalPrice: number
}) {
  const userId = await getUserId()
  const id = uuidv4()

  await db.insert(order).values({
    id,
    userId,
    ...data,
    status: 'pending',
  })
  revalidatePath('/account')
  return id
}

export async function getUserOrders() {
  const userId = await getUserId()
  return db
    .select()
    .from(order)
    .where(eq(order.userId, userId))
    .orderBy(desc(order.createdAt))
}

export async function getAllOrders() {
  const role = await getUserRole()
  if (role !== 'admin') throw new Error('Only admins can view all orders')

  return db.select().from(order).orderBy(desc(order.createdAt))
}

export async function updateOrderStatus(id: string, status: string) {
  const role = await getUserRole()
  if (role !== 'admin') throw new Error('Only admins can update order status')

  await db.update(order).set({ status }).where(eq(order.id, id))
  revalidatePath('/account')
}

export async function cancelOrder(id: string) {
  const userId = await getUserId()
  const orderData = await db.select().from(order).where(eq(order.id, id))

  if (!orderData[0] || orderData[0].userId !== userId) {
    throw new Error('Unauthorized')
  }

  await db.update(order).set({ status: 'cancelled' }).where(eq(order.id, id))
  revalidatePath('/account')
}

// Reviews
export async function addReview(data: {
  orderId: string
  paintingId?: string
  rating: number
  comment?: string
}) {
  const userId = await getUserId()
  const id = uuidv4()

  await db.insert(review).values({
    id,
    userId,
    ...data,
  })
  revalidatePath('/account')
  return id
}

export async function getOrderReview(orderId: string) {
  const result = await db.select().from(review).where(eq(review.orderId, orderId))
  return result[0]
}

export async function getPaintingReviews(paintingId: string) {
  return db.select().from(review).where(eq(review.paintingId, paintingId))
}
