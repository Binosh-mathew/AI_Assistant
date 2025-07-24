import React from 'react';
import { Brain, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

interface HeaderProps {
  messageCount: number;
}

export const Header: React.FC<HeaderProps> = ({ messageCount }) => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent mb-3">
        KTU AI Assistant
      </h1>
      
      <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
        Your intelligent academic companion for KTU syllabus, notes, rules, and guidelines
      </p>
      
      {messageCount === 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
            <BookOpen className="w-6 h-6 text-brand-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Syllabus Questions</h3>
            <p className="text-sm text-gray-600">Ask about course content, topics, and requirements</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
            <GraduationCap className="w-6 h-6 text-brand-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Academic Rules</h3>
            <p className="text-sm text-gray-600">Get information about university policies and guidelines</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
            <Brain className="w-6 h-6 text-brand-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Study Notes</h3>
            <p className="text-sm text-gray-600">Access explanations and summaries from your documents</p>
          </div>
        </div>
      )}
    </div>
  );
};
