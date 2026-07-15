# Bloomin Paints - Feature Implementation Summary

## Overview
Bloomin Paints is a premium art marketplace website with full authentication, custom painting requests, Indian Rupees pricing, and role-based admin dashboard.

## Color Theme
- **Primary Color**: Vibrant Fuchsia Pink (#e9439c)
- **Accent Color**: Light Pink (#ff80cc)
- **Background**: Soft Cream (#faf9f7)
- **Typography**: Playfair Display (headings), Poppins (body)

## Implemented Features

### 1. Authentication System
**Technology**: Better Auth + Neon PostgreSQL + Drizzle ORM

#### Sign Up Page
- New users can create accounts with email and password
- Validation for password strength (minimum 8 characters)
- Located at: `/sign-up`

#### Sign In Page
- Email/password authentication
- Demo credentials provided:
  - Email: `demo@example.com`
  - Password: `password123`
- Located at: `/sign-in`

#### User Roles
- **Buyer**: Default role for all users
  - Can view gallery, purchase paintings
  - Can create custom painting requests
  - Can manage orders (view, cancel)
  - Can leave reviews
- **Admin**: Protected role for marketplace managers
  - Can manage paintings (add, edit, delete)
  - Can view all orders and update status
  - Can view custom requests and update status
  - Admin dashboard access requires authentication + role check

### 2. Database Schema
**Tables Created**:
- `user`: User accounts with role field
- `session`: Authentication sessions
- `account`: OAuth account data
- `verification`: Email verification tokens
- `painting`: Artwork listings
- `customRequest`: Custom painting requests
- `order`: Customer orders
- `review`: Product reviews

**Key Features**:
- All queries scoped by `userId` for security
- No Row Level Security (RLS) on Neon - scoping done in application
- Proper relationships between orders, custom requests, and reviews

### 3. Pricing in Indian Rupees (INR)

#### Standard Painting Prices
All prices converted to INR range: ₹36,000 to ₹46,000

**Price Display**:
- Formatted with Indian locale: `₹36,000`
- Uses `formatPrice()` utility function
- All paintings displayed in gallery with rupee symbol

**Examples of Pricing**:
- Morning Bloom: ₹42,500
- Celestial Dreams: ₹36,000
- Wildlife Freedom: ₹45,500

### 4. Custom Painting Requests Feature

#### New Page: `/custom-request`
**Access**: Authenticated users only (redirects to sign-in if not logged in)

**Features**:
- Upload reference image from device
- Specify painting title and description
- Add style specifications (medium, style preferences)
- Set base price in INR
- **Automatic 30% Price Markup**: Final price = Base Price × 1.3

**Example**:
- User sets base price: ₹25,000
- System calculates: ₹25,000 × 1.3 = ₹32,500

**Pricing Breakdown Shown**:
- Base Price
- Premium Amount (30%)
- Final Price (highlighted in primary color)

**Request Status Tracking**:
- Pending (initial state)
- Accepted (artist reviewing)
- Rejected (artist declined)
- Completed (painting finished)

### 5. Buyer Dashboard & Account Management

#### Page: `/account`
**Access**: Authenticated buyers only

**Two Main Tabs**:

##### My Orders Tab
- View all placed orders with details:
  - Order ID (first 8 characters)
  - Total price in INR
  - Recipient name
  - Order status with color-coded badges
  - Created date
- **Actions**:
  - Cancel pending orders
  - View order details
- **Status Progression**: Pending → Confirmed → Paid → Shipped → Delivered
- Color-coded status indicators:
  - Green: Delivered
  - Red: Cancelled
  - Primary pink: Active orders

##### Custom Requests Tab
- View all submitted custom requests:
  - Request title
  - Base price and final price (with 30% markup)
  - Current status
  - Submitted date
- **Status Options**: Pending, Accepted, Rejected, Completed
- Shows artist notes if available

### 6. Protected Admin Console

#### Page: `/admin`
**Access Control**:
- Requires authentication (redirects to sign-in if not logged in)
- Requires admin role (redirects to home if buyer role)
- Built-in role verification

**Admin Dashboard Features**:

##### Statistics Overview
- Total Orders count
- Total Paintings count
- Pending Custom Requests count
- Completed Orders count

##### Orders Management Tab
- View all customer orders
- Update order status:
  - Pending
  - Confirmed
  - Paid
  - Shipped
  - Delivered
- Display customer information:
  - Name and email
  - Order total in INR
  - Order creation date
- One-click status updates with button interface

##### Custom Requests Tab
- View all custom painting requests from buyers
- Display request details:
  - Title and description
  - Base price and final price (30% markup)
  - Current status
- Update request status:
  - Pending
  - Accepted
  - Rejected
  - Completed
- Add or view artist notes for each request

##### Paintings Tab
- View gallery of all paintings
- Display in grid format with:
  - Painting image
  - Title
  - Price in INR
  - Availability status (Available/Sold)
- Easy access to manage paintings

### 7. Navbar Authentication Integration

**Features**:
- **For Unauthenticated Users**:
  - "Sign In" link
  - "Sign Up" button (prominent, primary color)

- **For Authenticated Users**:
  - "My Account" link (links to `/account`)
  - "Sign Out" button (red, with icon)
  - "Custom Request" option appears in menu

- **Mobile Responsive**:
  - Hamburger menu for mobile
  - All auth options in mobile menu
  - Smooth menu transitions

### 8. Gallery Features

#### Search & Filter Functionality
- **Real-time Search**: Search by painting title
- **Category Filters**:
  - Landscape
  - Abstract
  - Portrait
  - Nature
  - Floral
  - Animals
  - Still Life
  - Urban
- **Price Range Slider**:
  - Min: ₹0
  - Max: ₹50,000
  - Dynamic filtering in INR

#### Painting Cards Display
- **Information Shown**:
  - Painting image
  - Title
  - Description (first 2 lines)
  - Medium and dimensions
  - Price in INR (₹36,000 format)
  - Availability badge (green/red)
  - Category badge (primary pink)

- **Interactive Features**:
  - Hover lift animation
  - Smooth image zoom on hover
  - "View Details" overlay on image hover
  - "Learn More" button

#### Painting Details Page: `/painting/[id]`
- Full-size painting image
- Complete artwork information:
  - Title, artist, year created
  - Detailed story/description
  - Medium and dimensions
  - Full price display in INR
  - Availability status
- **Purchase Button**: "Buy Now" CTA
- Links to checkout flow

### 9. Checkout Flow

#### Page: `/checkout/[id]`
**Step 1: Buyer Information**
- Full Name (required)
- Email (required)
- Phone Number (required)

**Step 2: Delivery Address**
- Complete Address (required)
- City (required)
- State (required)
- Pincode (required)

**Step 3: Order Summary**
- Painting details with price in INR
- Delivery address summary
- Total amount (₹ format)

**Step 4: Confirmation**
- Order placed successfully page
- Message: "Artist will contact you to confirm payment and shipping details"
- Next steps clearly communicated
- Order ID provided

### 10. Security Implementation

#### Authentication Security
- Passwords hashed with Better Auth
- Session management with secure cookies
- CSRF protection
- Development-mode cookie override for cross-site iframe support

#### Data Security
- All queries filtered by `userId`
- No RLS - application-level scoping
- Unauthorized access attempts return errors
- Role checks prevent privilege escalation

#### Protected Routes
- Sign-in/sign-up redirects authenticated users away
- Account page redirects unauthenticated users to sign-in
- Admin panel:
  - Redirects unauthenticated users to sign-in
  - Redirects non-admin users to home page
  - Role verification on every access

### 11. Server Actions

**File**: `/app/actions/painting.ts`

**Implemented Actions**:
- `getPaintings()`: Fetch all paintings
- `getPaintingById(id)`: Get specific painting details
- `addPainting(data)`: Admin only - add new painting
- `updatePainting(id, data)`: Admin only - update painting
- `deletePainting(id)`: Admin only - delete painting
- `createCustomRequest(data)`: Buyer - create custom request
- `getUserCustomRequests()`: Get user's custom requests
- `getAllCustomRequests()`: Admin only - view all requests
- `updateCustomRequestStatus(id, status)`: Admin only - update request
- `createOrder(data)`: Buyer - place order
- `getUserOrders()`: Get user's orders
- `getAllOrders()`: Admin only - view all orders
- `updateOrderStatus(id, status)`: Admin only - update order status
- `cancelOrder(id)`: Buyer - cancel their own order
- `addReview(data)`: Buyer - submit review
- `getOrderReview(orderId)`: Fetch review for order
- `getPaintingReviews(paintingId)`: Get all reviews for painting

### 12. Sample Data

**20 Paintings Created** with:
- Varied categories (Landscape, Abstract, Portrait, Nature, Floral, Animals, Still Life, Urban)
- INR prices ranging from ₹36,000 to ₹46,000
- Detailed descriptions and artist stories
- High-quality placeholder images from Unsplash
- Mix of Available and Sold status

## Environment Variables

**Required** (with dummy demo values):
```
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=demo-secret-key-not-for-production
```

**For Production**, user needs to:
1. Generate BETTER_AUTH_SECRET: `openssl rand -base64 32`
2. Set real DATABASE_URL for Neon
3. Optionally add BLOB_READ_WRITE_TOKEN for image uploads

## Demo Credentials
- **Email**: demo@example.com
- **Password**: password123

## File Structure
```
lib/
├── auth.ts                 # Better Auth configuration
├── auth-client.ts          # Client-side auth hooks
├── paintings-data.ts       # Sample painting data + price formatting
├── db/
│   ├── index.ts           # Drizzle client setup
│   └── schema.ts          # Database schema with Better Auth tables

app/
├── api/auth/[...all]/route.ts  # Auth API handler
├── sign-in/page.tsx             # Sign-in page
├── sign-up/page.tsx             # Sign-up page
├── account/page.tsx             # Buyer dashboard
├── admin/page.tsx               # Admin panel (protected)
├── gallery/page.tsx             # Browse paintings
├── painting/[id]/page.tsx        # Painting details
├── checkout/[id]/page.tsx        # Checkout flow
├── custom-request/page.tsx       # Custom request form
└── actions/painting.ts          # Server actions

components/
├── navbar.tsx                   # Navigation with auth
├── footer.tsx                   # Footer section
├── auth-form.tsx                # Sign-in/sign-up form
├── painting-card.tsx            # Gallery card component
├── custom-request-form.tsx      # Custom request form
└── admin-dashboard.tsx          # Admin dashboard UI
```

## Key Technologies
- **Framework**: Next.js 16 (App Router)
- **Authentication**: Better Auth
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Typography**: Google Fonts (Playfair Display, Poppins)
- **Icons**: Lucide React

## Notes for Production

1. **Database**: Replace dummy values with real Neon database URL
2. **Auth Secret**: Generate secure BETTER_AUTH_SECRET using `openssl rand -base64 32`
3. **Image Uploads**: Connect Vercel Blob for custom request image storage
4. **Admin Setup**: Create first admin user manually in database with `role = 'admin'`
5. **Payments**: Implement payment gateway when moving from demo state
6. **Email**: Set up email verification for Better Auth
7. **CORS**: Configure proper CORS if API is on different domain

## Testing the Features

### Test as Buyer:
1. Visit `/sign-up` and create account
2. Browse `/gallery` with search and filters
3. Click painting to view `/painting/[id]`
4. Click "Buy Now" for checkout
5. Visit `/account` to see orders
6. Visit `/custom-request` to submit custom painting idea
7. View `/account` to track custom requests

### Test as Admin:
1. Create admin account and manually set `role = 'admin'` in database
2. Visit `/admin` to access admin dashboard
3. Manage orders, custom requests, and paintings
4. Update statuses for orders and requests

## Future Enhancements
- Implement Stripe/Razorpay for payments
- Email notifications for orders and requests
- Advanced image gallery with zoom and thumbnails
- User profile customization
- Wishlist/favorites system
- Multiple language support
- Advanced analytics dashboard
