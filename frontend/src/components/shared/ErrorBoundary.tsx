import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="flex items-center justify-center min-h-[400px] px-4">
          <div className="text-center max-w-md">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <AlertTriangle className="w-8 h-8 text-[var(--color-warning)]" />
            </div>
            <h3
              className="font-heading text-xl font-semibold mb-2"
              style={{ color: 'var(--text-heading)' }}
            >
              Something went wrong
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              We're sorry for the inconvenience. Please try again or contact support if the problem persists.
            </p>
            <button
              onClick={this.handleRetry}
              className="btn btn-primary btn-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
