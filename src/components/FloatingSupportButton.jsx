



// src/components/FloatingSupportButton.jsx
import React from "react";

export default function FloatingSupportButton() {
  // رقم الواتساب المطلوب
  const waNumber = "01559434566";

  return (
    // زر عائم: أسفل يمين مع هامش (غير ملاصق للحواف)
    <div className="fixed bottom-6 right-6 z-50">
      <a
        aria-label="واتساب"
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noreferrer"
        // خلفية خضراء + أيقونة/نص أبيض + شكل دائري + ظل + تأثير تحويم
        className="w-14 h-14 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 active:bg-green-800 transition"
        title="تواصل عبر واتساب"
      >
        {/* أيقونة واتساب بيضاء */}
        <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 3a13 13 0 00-11 19.8L4 29l6.4-1.7A13 13 0 1016 3zm7.5 20.5A10.6 10.6 0 116.9 6.9 10.6 10.6 0 0123.5 23.5z"
          />
          <path
            fill="currentColor"
            d="M21 18.5c-.2-.1-1.2-.6-1.4-.7s-.4-.1-.5.1-.6.7-.7.8-.3.1-.5 0-1-.4-1.9-1.3-1.4-1.8-1.5-2-.1-.4.1-.6l.4-.5c.1-.2.1-.3.2-.5s0-.3-.1-.5-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3s-.8.8-.8 2 .9 2.5 1 2.7 1.9 2.6 4.5 3.8c.6.3 1.1.4 1.5.5.6.2 1.2.1 1.6.1.5-.1 1.5-.6 1.7-1.2s.2-1 .1-1.1-.2-.2-.5-.3z"
          />
        </svg>
      </a>
    </div>
  );
}
