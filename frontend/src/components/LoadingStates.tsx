import React from 'react';

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse-slow"></div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonMessage: React.FC = () => {
  return (
    <div className="flex gap-4 animate-pulse">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="bg-gray-200 rounded-2xl p-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
