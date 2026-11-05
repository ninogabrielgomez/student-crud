import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Notification({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div
      role="alert"
      className={`flex items-center justify-between p-4 mb-6 rounded-xl border shadow-sm transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-rose-50 border-rose-200 text-rose-800'
      }`}
    >
      <div className="flex items-center space-x-3">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>

      <button
        onClick={onClose}
        className={`p-1 rounded-md transition hover:bg-black/5 cursor-pointer ${
          isSuccess ? 'text-emerald-700 hover:text-emerald-900' : 'text-rose-700 hover:text-rose-900'
        }`}
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
