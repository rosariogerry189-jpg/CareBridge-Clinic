import { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Stethoscope,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';

const services = [
  { value: '', label: 'Select a service…' },
  { value: 'general', label: 'General Checkup' },
  { value: 'dental', label: 'Dental' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'laboratory', label: 'Laboratory' },
];

const doctors = [
  { value: '', label: 'No preference' },
  { value: 'dr-lee', label: 'Dr. Sarah Lee — General Practice' },
  { value: 'dr-patel', label: 'Dr. Anil Patel — Dental' },
  { value: 'dr-garcia', label: 'Dr. Maria Garcia — Pediatrics' },
  { value: 'dr-okafor', label: 'Dr. James Okafor — Laboratory' },
];

const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '3:00 PM'];

const serviceLabels: Record<string, string> = {
  general: 'General Checkup',
  dental: 'Dental',
  pediatrics: 'Pediatrics',
  laboratory: 'Laboratory',
};

const doctorLabels: Record<string, string> = {
  'dr-lee': 'Dr. Sarah Lee — General Practice',
  'dr-patel': 'Dr. Anil Patel — Dental',
  'dr-garcia': 'Dr. Maria Garcia — Pediatrics',
  'dr-okafor': 'Dr. James Okafor — Laboratory',
};

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  date?: string;
  timeSlot?: string;
}

interface SubmittedData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  doctor: string;
  date: string;
  timeSlot: string;
  reason: string;
  reference: string;
}

function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'CB-';
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function AppointmentForm() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);

  const today = new Date().toISOString().split('T')[0];

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!fullName.trim()) e.fullName = 'Please enter your full name.';
    if (!phone.trim()) {
      e.phone = 'Please enter your phone number.';
    } else if (phone.replace(/\D/g, '').length < 10) {
      e.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!email.trim()) {
      e.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = 'Please enter a valid email address.';
    }
    if (!service) e.service = 'Please select a service or department.';
    if (!date) e.date = 'Please choose a preferred date.';
    if (!selectedSlot) e.timeSlot = 'Please pick a time slot.';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitted({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service,
      doctor,
      date,
      timeSlot: selectedSlot!,
      reason: reason.trim(),
      reference: generateReference(),
    });
  }

  function resetForm() {
    setFullName('');
    setPhone('');
    setEmail('');
    setService('');
    setDoctor('');
    setDate('');
    setSelectedSlot(null);
    setReason('');
    setErrors({});
    setSubmitted(null);
  }

  /* ---------- Confirmation panel ---------- */
  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-10 text-center border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Appointment Request Submitted!
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            We've received your request. Our team will contact you within 24
            hours to confirm your appointment.
          </p>
          <p className="mt-4 inline-block px-4 py-1.5 bg-clinic-50 text-clinic-700 text-sm font-semibold rounded-lg">
            Reference: {submitted.reference}
          </p>
        </div>

        <div className="px-6 py-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Appointment Summary
          </h3>
          <dl className="divide-y divide-gray-100">
            <SummaryRow label="Name" value={submitted.fullName} />
            <SummaryRow label="Phone" value={submitted.phone} />
            <SummaryRow label="Email" value={submitted.email} />
            <SummaryRow
              label="Service"
              value={serviceLabels[submitted.service]}
            />
            <SummaryRow
              label="Doctor"
              value={
                submitted.doctor
                  ? doctorLabels[submitted.doctor]
                  : 'No preference'
              }
            />
            <SummaryRow label="Date" value={formatDate(submitted.date)} />
            <SummaryRow label="Time" value={submitted.timeSlot} />
            <SummaryRow
              label="Reason"
              value={submitted.reason || '—'}
            />
          </dl>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={resetForm}
            className="w-full flex items-center justify-center gap-2 py-3 bg-clinic-500 text-white text-base font-semibold rounded-lg hover:bg-clinic-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Book Another
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Form ---------- */
  const inputErrorClass = (hasError?: string) =>
    hasError
      ? 'border-red-400 focus:ring-2 focus:ring-red-300 focus:border-red-400'
      : 'border-gray-300 focus:ring-2 focus:ring-clinic-400 focus:border-clinic-400';

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Book an Appointment</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in your details below and we'll confirm your request.
        </p>
      </div>

      <form className="px-6 py-6 space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Full name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition ${inputErrorClass(errors.fullName)}`}
            />
          </div>
          {errors.fullName && <ErrorText text={errors.fullName} />}
        </div>

        {/* Phone + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition ${inputErrorClass(errors.phone)}`}
              />
            </div>
            {errors.phone && <ErrorText text={errors.phone} />}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition ${inputErrorClass(errors.email)}`}
              />
            </div>
            {errors.email && <ErrorText text={errors.email} />}
          </div>
        </div>

        {/* Service + Doctor row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">
              Service / Department <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 focus:outline-none transition appearance-none bg-white ${inputErrorClass(errors.service)}`}
              >
                {services.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.service && <ErrorText text={errors.service} />}
          </div>

          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1.5">
              Preferred Doctor <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                id="doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-clinic-400 focus:border-clinic-400 transition appearance-none bg-white"
              >
                {doctors.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 focus:outline-none transition ${inputErrorClass(errors.date)}`}
            />
          </div>
          {errors.date && <ErrorText text={errors.date} />}
        </div>

        {/* Time slots */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              Preferred Time Slot <span className="text-red-500">*</span>
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-4 rounded-lg text-sm font-medium border transition-all ${
                    isSelected
                      ? 'bg-clinic-500 text-white border-clinic-500 ring-2 ring-clinic-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-clinic-400 hover:bg-clinic-50'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          {errors.timeSlot && <ErrorText text={errors.timeSlot} />}
        </div>

        {/* Reason for visit */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              Reason for Visit
            </span>
          </label>
          <textarea
            id="reason"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Briefly describe your symptoms or reason for the appointment…"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-clinic-400 focus:border-clinic-400 transition resize-none"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-clinic-500 text-white text-base font-semibold rounded-lg hover:bg-clinic-600 transition-colors"
        >
          <Send className="w-4 h-4" />
          Submit Request
        </button>
      </form>
    </div>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
      {text}
    </p>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2.5">
      <dt className="text-sm text-gray-500 font-medium">{label}</dt>
      <dd className="text-sm text-gray-800 text-right max-w-[60%]">{value}</dd>
    </div>
  );
}
