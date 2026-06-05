import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';
import type { Toast as ToastType } from '@/store/useToastStore';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', text: '#22c55e' },
  error: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', text: '#ef4444' },
  info: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', text: 'var(--color-primary-400)' },
  warning: { bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)', text: '#eab308' },
};

const ToastItem = ({ toast, onRemove }: { toast: ToastType; onRemove: (id: string) => void }) => {
  const Icon = iconMap[toast.type];
  const colors = colorMap[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '14px',
        background: 'var(--bg-card)',
        border: `1px solid ${colors.border}`,
        boxShadow: '0 12px 40px -8px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
        minWidth: '320px',
        maxWidth: '440px',
      }}
    >
      <Icon style={{ width: '18px', height: '18px', color: colors.text, flexShrink: 0, marginTop: '1px' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)' }}>
          {toast.title}
        </div>
        {toast.message && (
          <div style={{ fontSize: '12px', fontFamily: 'var(--font-accent)', color: 'var(--text-tertiary)', marginTop: '2px', lineHeight: 1.4 }}>
            {toast.message}
          </div>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '2px', flexShrink: 0 }}
      >
        <X style={{ width: '14px', height: '14px' }} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem toast={t} onRemove={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
