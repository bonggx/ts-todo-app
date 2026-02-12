import { useState } from 'react';
import { Bomb } from 'lucide-react';

function ErrorTestPage() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    // Triggers the Error Boundary
    throw new Error('This is a test error to demonstrate the Error Boundary!');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <Bomb className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Error Boundary Test
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to trigger an error and see the Error Boundary in action.
        </p>
        <button
          onClick={() => setShouldThrowError(true)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Trigger Error
        </button>
        <p className="text-sm text-gray-500 mt-4">
          This demonstrates how the app handles unexpected errors gracefully.
        </p>
      </div>
    </div>
  );
}

export default ErrorTestPage;