import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: 'How do I cancel or reschedule my appointment?',
    answer:
      'Call us at (555) 123-4567 at least 24 hours before your scheduled time. We currently do not offer online rescheduling, but our front desk will be happy to help you find a new time slot.',
  },
  {
    question: 'What should I bring to my appointment?',
    answer:
      'Please bring a valid photo ID, your insurance card (if applicable), a list of current medications, and any relevant medical records or referral letters. For lab visits, fasting may be required — our team will let you know in advance.',
  },
  {
    question: 'What should I do in an emergency?',
    answer:
      'For medical emergencies, call 911 or go to the nearest emergency room immediately. Do not use this contact form for urgent or life-threatening situations — it is only for routine appointment requests and general inquiries.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Quick answers to common questions.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-clinic-50/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-gray-700 pr-3">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${
                  isOpen ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
