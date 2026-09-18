import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container-custom">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          {toast.type === 'success' && <CheckCircle2 size={20} className="text-success" />}
          {toast.type === 'info' && <Info size={20} className="text-info" />}
          {toast.type === 'error' && <AlertCircle size={20} className="text-danger" />}
          
          <div className="flex-grow-1">
            <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{toast.title}</div>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>{toast.message}</small>
          </div>

          <button
            className="btn-close btn-close-white btn-sm ms-2"
            onClick={() => removeToast(toast.id)}
          ></button>
        </div>
      ))}
    </div>
  );
}
