import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  icon: ReactNode;
  index?: number;
}

export const StatCard = ({ label, value, trend, icon, index = 0 }: StatCardProps) => {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '24px',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="hover:border-[var(--border-hover)]"
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(59, 130, 246, 0.1)',
            color: 'var(--color-primary-400)',
          }}
        >
          {icon}
        </div>
        {trend !== undefined && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontFamily: 'var(--font-accent)',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '20px',
              background: isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: isPositive ? '#22c55e' : '#ef4444',
            }}
          >
            {isPositive ? <TrendingUp style={{ width: '14px', height: '14px' }} /> : <TrendingDown style={{ width: '14px', height: '14px' }} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: '28px',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-heading)',
          lineHeight: 1,
          marginBottom: '4px',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '13px',
          fontFamily: 'var(--font-accent)',
          color: 'var(--text-secondary)',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
};
