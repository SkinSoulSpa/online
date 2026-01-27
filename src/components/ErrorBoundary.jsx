import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          color: '#8C8C8C', 
          backgroundColor: '#F5F5F0',
          borderRadius: '4px',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          <p>Something went wrong loading this visual.</p>
          <span style={{ fontSize: '0.8rem' }}>{this.state.error && this.state.error.toString()}</span>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
