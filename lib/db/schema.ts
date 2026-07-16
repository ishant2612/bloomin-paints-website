import { pgTable, text, timestamp, boolean, integer, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Better Auth Tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().default(new Date()),
  updatedAt: timestamp('updatedAt').notNull().default(new Date()),
  role: text('role').notNull().default('buyer'),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().default(new Date()),
  updatedAt: timestamp('updatedAt').notNull().default(new Date()),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().default(new Date()),
  updatedAt: timestamp('updatedAt').notNull().default(new Date()),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').default(new Date()),
  updatedAt: timestamp('updatedAt'),
})

// App Tables
export const painting = pgTable('painting', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  story: text('story').notNull(),
  image: text('image').notNull(),
  price: integer('price').notNull(), // in INR
  category: text('category').notNull(),
  medium: text('medium').notNull(),
  dimensions: text('dimensions').notNull(),
  availability: text('availability').notNull().default('available'), // available, sold
  createdAt: timestamp('createdAt').notNull().default(new Date()),
  updatedAt: timestamp('updatedAt').notNull().default(new Date()),
})

export const customRequest = pgTable('customRequest', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('imageUrl').notNull(),
  specifications: text('specifications'),
  basePrice: integer('basePrice').notNull(), // base price in INR
  finalPrice: integer('finalPrice').notNull(), // with 30% markup
  status: text('status').notNull().default('pending'), // pending, accepted, rejected, completed
  artistNotes: text('artistNotes'),
  createdAt: timestamp('createdAt').notNull().default(new Date()),
  updatedAt: timestamp('updatedAt').notNull().default(new Date()),
})

export const order = pgTable('order', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  paintingId: text('paintingId').references(() => painting.id),
  customRequestId: text('customRequestId').references(() => customRequest.id),
  fullName: text('fullName').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  pincode: text('pincode').notNull(),
  totalPrice: integer('totalPrice').notNull(), // in INR
  status: text('status').notNull().default('pending'), // pending, confirmed, paid, shipped, delivered
  createdAt: timestamp('createdAt').notNull().default(new Date()),
  updatedAt: timestamp('updatedAt').notNull().default(new Date()),
})

export const review = pgTable('review', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  orderId: text('orderId')
    .notNull()
    .references(() => order.id, { onDelete: 'cascade' }),
  paintingId: text('paintingId').references(() => painting.id),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  status: text('status').notNull().default('pending'), // pending, approved
  authorName: text('authorName').notNull().default('Anonymous'),
  createdAt: timestamp('createdAt').notNull().default(new Date()),
  updatedAt: timestamp('updatedAt').notNull().default(new Date()),
})

// Relations
export const userRelations = relations(user, ({ many }) => ({
  orders: many(order),
  customRequests: many(customRequest),
  reviews: many(review),
  sessions: many(session),
  accounts: many(account),
}))

export const orderRelations = relations(order, ({ one, many }) => ({
  user: one(user, { fields: [order.userId], references: [user.id] }),
  painting: one(painting, { fields: [order.paintingId], references: [painting.id] }),
  customRequest: one(customRequest, {
    fields: [order.customRequestId],
    references: [customRequest.id],
  }),
  reviews: many(review),
}))

export const customRequestRelations = relations(customRequest, ({ one, many }) => ({
  user: one(user, { fields: [customRequest.userId], references: [user.id] }),
  orders: many(order),
}))

export const reviewRelations = relations(review, ({ one }) => ({
  user: one(user, { fields: [review.userId], references: [user.id] }),
  order: one(order, { fields: [review.orderId], references: [order.id] }),
  painting: one(painting, { fields: [review.paintingId], references: [painting.id] }),
}))
