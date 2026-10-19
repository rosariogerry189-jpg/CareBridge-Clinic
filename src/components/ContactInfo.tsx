import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MapPinned,
} from 'lucide-react';

const hours = [
  { day: 'Mon – Fri', time: '8:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact details card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Clinic Information</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Reach us directly with any questions.
          </p>
        </div>

        <div className="px-5 py-5 space-y-4">
          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-clinic-50 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-clinic-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Phone</p>
              <a
                href="tel:+15551234567"
                className="text-sm font-semibold text-gray-800 hover:text-clinic-600 transition-colors"
              >
                (555) 123-4567
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-clinic-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-clinic-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Email</p>
              <a
                href="mailto:hello@carebridgeclinic.com"
                className="text-sm font-semibold text-gray-800 hover:text-clinic-600 transition-colors"
              >
                hello@carebridgeclinic.com
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-clinic-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-clinic-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Address</p>
              <p className="text-sm font-semibold text-gray-800">
                1200 Wellness Ave, Suite 200
                <br />
                Riverside, CA 92501
              </p>
            </div>
          </div>
        </div>

        {/* Clinic hours */}
        <div className="px-5 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-clinic-600" />
            <h3 className="text-sm font-semibold text-gray-700">Clinic Hours</h3>
          </div>
          <dl className="space-y-2">
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between text-sm">
                <dt className="text-gray-500">{h.day}</dt>
                <dd
                  className={`font-medium ${
                    h.time === 'Closed'
                      ? 'text-red-500'
                      : 'text-gray-800'
                  }`}
                >
                  {h.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center gap-2">
          <MapPinned className="w-10 h-10 text-gray-300" />
          <p className="text-sm text-gray-400 font-medium">Map</p>
          <p className="text-xs text-gray-300">
            1200 Wellness Ave, Riverside, CA
          </p>
        </div>
      </div>
    </div>
  );
}
