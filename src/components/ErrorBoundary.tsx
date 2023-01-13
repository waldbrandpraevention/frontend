import React, { ErrorInfo } from "react";
import UnexpectedError from "../pages/UnexpectedError";

type ErrorBoundaryState = {
  error?: Error
  hasError: boolean
}

type ErrorBoundaryProps = {
  children: React.ReactElement
}

/* must be class component! */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.warn(error, errorInfo);
  }

  resetError() {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return <UnexpectedError err={this.state.error}></UnexpectedError>;
    }

    return this.props.children;
  }
}