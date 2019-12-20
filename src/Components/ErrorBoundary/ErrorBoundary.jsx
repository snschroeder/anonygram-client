import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>Something went wrong. Please refresh the page.</h2>
      );
    }
    return this.props.children
  }
}