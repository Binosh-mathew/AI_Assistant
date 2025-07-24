import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 animate-slide-up">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-800 mb-1">Something went wrong</h3>
          <p className="text-red-700 text-sm leading-relaxed">{error}</p>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
