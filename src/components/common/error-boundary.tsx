import React from "react";

type State<E extends Error = Error> = {
  error: E | null;
};

const initialState: State = {
  error: null,
};

export type ErrorBoundaryProps = React.PropsWithChildren & {
  fallback: <E extends Error = Error>({
    error,
    reset,
  }: {
    error: E;
    reset: () => void;
  }) => React.ReactNode;

  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;

  onReset?: () => void;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;

    onError?.(error, errorInfo);
  }

  render() {
    const { fallback, children } = this.props;
    const { error } = this.state;

    if (error) {
      return fallback({ error, reset: this.reset });
    }

    return children;
  }

  reset = () => {
    this.props.onReset?.();
    this.setState(initialState);
  };
}
