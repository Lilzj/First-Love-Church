import { motion } from 'framer-motion';
import { Search, FileX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'search' | 'file' | 'default';
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  search: Search,
  file: FileX,
  default: FileX,
};

export const EmptyState = ({
  title = 'Nothing here yet',
  description = 'Check back later for new content.',
  icon = 'default',
  action,
}: EmptyStateProps) => {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-sm">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'var(--bg-tertiary)' }}
        >
          <Icon className="w-10 h-10" style={{ color: 'var(--text-tertiary)' }} />
        </div>
        <h3
          className="font-heading text-xl font-semibold mb-2"
          style={{ color: 'var(--text-heading)' }}
        >
          {title}
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
        {action && (
          <button onClick={action.onClick} className="btn btn-primary btn-sm">
            {action.label}
          </button>
        )}
      </div>
    </motion.div>
  );
};
