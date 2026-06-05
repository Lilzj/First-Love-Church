import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'date' | 'datetime-local' | 'email' | 'url' | 'number' | 'file';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  children?: ReactNode;
}

export const FormField = ({
  label,
  type = 'text',
  value = '',
  onChange,
  placeholder = '',
  error,
  required = false,
  options = [],
}: FormFieldProps) => {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: type === 'textarea' ? '12px 14px' : '10px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    fontFamily: 'var(--font-accent)',
    background: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: `1px solid ${error ? '#ef4444' : 'var(--border-color)'}`,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    resize: type === 'textarea' ? 'vertical' as const : undefined,
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '12px',
          fontFamily: 'var(--font-accent)',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={4}
          style={inputStyle}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}

      {error && (
        <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', fontFamily: 'var(--font-accent)' }}>
          {error}
        </p>
      )}
    </div>
  );
};
