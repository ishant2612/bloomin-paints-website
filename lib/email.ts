import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface OrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  paintingTitle: string
  price: number
  address: string
  city: string
  state: string
  pincode: string
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  try {
    await resend.emails.send({
      from: 'orders@bloominpaints.com',
      to: data.customerEmail,
      subject: `Order Confirmation - Bloomin Paints #${data.orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #faf9f7; }
              .header { background: linear-gradient(135deg, #e9439c 0%, #ff80cc 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
              .order-details { background: #f8e5f2; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
              .label { font-weight: bold; color: #2c2c2c; }
              .value { color: #666; }
              .price { font-size: 24px; color: #e9439c; font-weight: bold; }
              .button { background: #e9439c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px; }
              .footer { background: #f5f3f0; padding: 20px; text-align: center; font-size: 12px; color: #666; margin-top: 20px; border-radius: 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Order Confirmation</h1>
                <p>Thank you for your purchase!</p>
              </div>
              <div class="content">
                <p>Hi ${data.customerName},</p>
                <p>Your order has been confirmed. Below are your order details:</p>
                
                <div class="order-details">
                  <div class="detail-row">
                    <span class="label">Order ID:</span>
                    <span class="value">#${data.orderId}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Artwork:</span>
                    <span class="value">${data.paintingTitle}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Total Price:</span>
                    <span class="price">₹${data.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <h3 style="color: #2c2c2c; margin-top: 30px;">Delivery Address</h3>
                <div style="background: #faf9f7; padding: 15px; border-radius: 6px;">
                  <p>${data.customerName}</p>
                  <p>${data.address}</p>
                  <p>${data.city}, ${data.state} ${data.pincode}</p>
                </div>

                <p style="margin-top: 30px; color: #666;">
                  Our team will contact you soon to confirm the payment and shipping details. You can track your order using your Order ID.
                </p>

                <a href="https://bloominpaints.com/account" class="button">View Your Order</a>

                <div class="footer">
                  <p>Questions? Contact us at support@bloominpaints.com</p>
                  <p>&copy; 2024 Bloomin Paints. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    console.log(`[v0] Order confirmation email sent to ${data.customerEmail}`)
    return true
  } catch (error) {
    console.error('[v0] Failed to send email:', error)
    return false
  }
}
