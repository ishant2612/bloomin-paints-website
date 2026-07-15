import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CustomRequestForm from '@/components/custom-request-form'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Custom Painting Request - Bloomin Paints',
  description: 'Commission a custom painting tailored to your unique vision',
}

export default async function CustomRequestPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Commission Your Vision</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a specific image or idea in mind? Upload an image and we&apos;ll create a custom painting just for you. Custom
              requests are priced at 30% premium above our standard pricing.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <CustomRequestForm />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">30% Premium Pricing</h3>
              <p className="text-sm text-muted-foreground">Custom paintings are priced 30% above our standard rates.</p>
            </div>
            <div className="bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Personalized Creation</h3>
              <p className="text-sm text-muted-foreground">Each custom painting is created specifically for you with attention to detail.</p>
            </div>
            <div className="bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Artist Communication</h3>
              <p className="text-sm text-muted-foreground">We&apos;ll work closely with you to ensure your vision comes to life.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
