import { Component, ReactNode } from "react";

// Props type for wrapper component
type Props = {
  children: ReactNode;
};

// State used to track if an error has occurred
type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // initial state before any error occurs
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // runs when a child component throws an error during render
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  // logs error details for debugging or external monitoring tools
  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Component stack trace:", errorInfo?.componentStack);
  }

  // resets the error state so the app can try rendering again
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Something went wrong
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              {this.state.error?.message}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReset}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Try again
              </button>

              <a href="/" className="text-blue-600 text-sm hover:underline">
                ← Back to Todo List
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
