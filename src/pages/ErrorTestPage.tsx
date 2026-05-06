import { useState } from "react";

function ErrorTestPage() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  // intentionally trigger error to test ErrorBoundary
  if (shouldThrowError) {
    throw new Error("Test error");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Error Boundary Test
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Click the button below to intentionally trigger an error.
        </p>

        <button
          onClick={() => setShouldThrowError(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Trigger Error
        </button>
      </div>
    </div>
  );
}

export default ErrorTestPage;
