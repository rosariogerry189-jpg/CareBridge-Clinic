import { Phone, AlertCircle } from 'lucide-react';

const footerLinks = ['Privacy Policy', 'Terms of Service', 'Patient Portal', 'Careers'];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Emergency notice */}
        <div className="flex items-start gap-3 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">
            <span className="font-semibold">For emergencies,</span> call your
            local emergency number (e.g. 911). Do not use this form for urgent
            medical needs.
          </p>
        </div>

        {/* Links + clinic info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              CareBridge Clinic
            </span>
            <span className="text-xs text-gray-400">© 2026</span>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-gray-500 hover:text-clinic-600 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Phone className="w-4 h-4" />
            <span>(555) 123-4567</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
