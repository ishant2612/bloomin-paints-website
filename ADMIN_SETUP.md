# Quick Admin Setup Guide

## How to Test Admin Panel

### Step 1: Sign Up as New User
1. Go to `/sign-up`
2. Fill in your details
3. In "Account Type (Demo)" dropdown, you'll see two options:
   - "Buyer - Purchase Paintings" (default)
   - "Admin - Manage Store (Set role in DB after signup)"
4. Click "Create Account"
5. You'll be redirected to home as a buyer

### Step 2: Set Role to Admin in Database
1. Go to Neon dashboard for your Bloomin Paints database
2. Open the SQL editor
3. Find your email address from sign-up and run this query:
   ```sql
   UPDATE "user" 
   SET role = 'admin' 
   WHERE email = 'your-email@example.com';
   ```
4. Execute the query
5. Verify the update completed

### Step 3: Access Admin Panel
**Option A: After Refresh**
1. Refresh your browser (Ctrl+R or Cmd+R)
2. Click on your account dropdown or navigate directly to `/admin`
3. You should see the full admin dashboard

**Option B: Direct Access**
1. Go directly to `http://localhost:3000/admin` (or your domain)
2. If logged in as admin, you'll see the dashboard
3. If not admin, you'll see "Access Denied" message

### Step 4: Admin Dashboard Features
Once you're an admin, you can:

**Overview Tab:**
- See total orders count
- View total revenue (in Lakhs)
- Count of pending custom requests
- Pending reviews awaiting approval

**Orders Tab:**
- View all customer orders with details
- See customer name, email, address, phone
- See order total in INR (₹)
- Update order status: Pending → Confirmed → Paid → Shipped → Delivered → Cancelled
- One-click status buttons

**Requests Tab:**
- View all custom painting requests from buyers
- See base price and final price (with 30% markup)
- Add artist notes for each request
- Update request status: Pending → Accepted → Rejected → Completed

**Paintings Tab:**
- View all paintings in grid format
- Edit/Delete buttons for each painting
- "Add Painting" button to add new artworks
- Shows availability status

**Reviews Tab:**
- See pending reviews awaiting approval
- Approve reviews to display on homepage testimonials
- Reject/remove reviews
- View approved reviews list

---

## Testing Orders & Emails

### Place a Test Order
1. Sign in as a buyer (or create buyer account)
2. Browse gallery at `/gallery`
3. Click on a painting
4. Click "View Details"
5. Click "Buy Now"
6. Fill in delivery details
7. Review and confirm order
8. Order is saved to database!

### Check Order in Account
1. Go to `/account`
2. Click "My Orders" tab
3. You should see your newly created order with:
   - Order ID (starts with ORD-)
   - Painting title
   - Price in INR (₹)
   - Status (starts as "Pending")
   - Delivery address
   - Cancel button

### Check Email (if Resend API key configured)
1. After placing order, check your inbox
2. You should receive email from: orders@bloominpaints.com
3. Email contains:
   - Unique order ID
   - Painting title and price
   - Delivery address
   - Message that artist will contact you

---

## Troubleshooting

**Q: Admin panel not showing after setting role in DB**
A: 
1. Refresh the page (Ctrl+R)
2. Make sure you're signed in
3. Check the browser console for logs like "[v0] Current user role: admin"
4. Verify the database update was successful with: `SELECT role FROM "user" WHERE email = 'your-email@example.com';`

**Q: Orders not showing in account page**
A:
1. Make sure you're signed in (not just unauthenticated)
2. Orders must have matching userId in database
3. Check dev console for any errors
4. Try refreshing the page

**Q: Email not received**
A:
1. Resend API key must be configured in environment variables
2. Check Resend dashboard for bounced/failed emails
3. Make sure email domain is verified in Resend
4. Check spam folder

**Q: Getting "Access Denied" on admin panel**
A:
1. Your role is not set to 'admin' in database
2. Update your role: `UPDATE "user" SET role = 'admin' WHERE email = 'your-email@example.com';`
3. Refresh and try again

---

## Demo Flow

### Complete Flow (5 minutes)
1. **Sign Up as Buyer** (2 min)
   - Go to `/sign-up`
   - Create account with email/password
   - Keep note of your email

2. **Create Admin Account** (2 min)
   - Sign out
   - Go to `/sign-up` again
   - Create new account with different email
   - Copy the email address
   - Go to Neon, run: `UPDATE "user" SET role = 'admin' WHERE email = 'admin-email@example.com';`
   - Refresh or revisit site
   - Go to `/admin` - should see dashboard

3. **Browse & Buy as Buyer** (1 min)
   - Sign in as buyer account
   - Go to `/gallery`
   - Click a painting
   - Click "Buy Now"
   - Fill form and confirm order

4. **View Orders as Admin** (not in demo but available)
   - Sign in as admin
   - Go to `/admin`
   - Click "Orders" tab
   - See the order you just placed
   - Update status if desired

---

## Notes for Production

- Remove the "(Demo)" text from Account Type label in auth-form.tsx when auto-assigning roles
- Implement proper role assignment during signup with verification
- Add email verification for real deployments
- Configure proper RESEND_API_KEY with verified domain
- Test email delivery in staging environment
- Set up webhook for email delivery tracking

---

**You're now ready to test the complete Bloomin Paints admin system!**
