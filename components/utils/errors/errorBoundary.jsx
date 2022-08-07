//https://nextjs.org/docs/advanced-features/error-handling

import React from "react";
import ErrorPage from "./errorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage status={500} message="Internal server error" />;
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
