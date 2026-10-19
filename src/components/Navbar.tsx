import { HeartPulse, Menu } from 'lucide-react';

const navLinks = ['Home', 'Services', 'Doctors', 'Contact Us'];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-clinic-500 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              CareBridge Clinic
            </span>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className={`text-sm font-medium transition-colors ${
                  link === 'Contact Us'
                    ? 'text-clinic-600'
                    : 'text-gray-600 hover:text-clinic-600'
                }`}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Book button + mobile menu icon */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center px-4 py-2 bg-clinic-500 text-white text-sm font-semibold rounded-lg hover:bg-clinic-600 transition-colors">
              Book Appointment
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-clinic-600 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
