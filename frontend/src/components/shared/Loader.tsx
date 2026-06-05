export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="loader-ring" />
        <p className="text-sm font-accent" style={{ color: 'var(--text-tertiary)' }}>
          Loading...
        </p>
      </div>
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[var(--border-color)] border-t-[var(--color-primary-500)] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-heading font-bold text-gradient-primary">✝</span>
          </div>
        </div>
        <div className="text-center">
          <p className="font-heading text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>
            First Love Church
          </p>
          <p className="text-sm font-accent mt-1" style={{ color: 'var(--text-tertiary)' }}>
            Where Love Finds You
          </p>
        </div>
      </div>
    </div>
  );
};
