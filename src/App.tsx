import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';
import ContactInfo from '@/components/ContactInfo';
import FAQ from '@/components/FAQ';
import { CalendarHeart } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Page header */}
      <section className="bg-clinic-50 border-b border-clinic-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-clinic-500 flex items-center justify-center">
              <CalendarHeart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Contact Us
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Book an appointment or reach out with any questions — we're here to
            help you get the care you need.
          </p>
        </div>
      </section>

      {/* Main content — two-column on desktop, single column on mobile */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: appointment form (spans 2/3 on desktop) */}
          <div className="lg:col-span-2">
            <AppointmentForm />
          </div>

          {/* Right column: contact info + FAQ */}
          <div className="lg:col-span-1 space-y-6">
            <ContactInfo />
            <FAQ />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
