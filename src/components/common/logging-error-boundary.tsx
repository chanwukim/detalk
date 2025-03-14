import { ErrorBoundary, type ErrorBoundaryProps } from "./error-boundary";

type LoggingErrorBoundaryProps = ErrorBoundaryProps;

export default function LoggingErrorBoundary({
  fallback,
  onError,
  onReset,
  children,
}: LoggingErrorBoundaryProps) {
  function handleError(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: sentry
    console.error(error);
    console.error(errorInfo);
    onError?.(error, errorInfo);
  }

  return (
    <ErrorBoundary fallback={fallback} onError={handleError} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
}
