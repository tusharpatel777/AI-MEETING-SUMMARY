
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-8">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-content-200 text-sm">
        <p className="font-semibold mb-1">🚀 Bonus Commands</p>
        <p>
          Try asking: "Create sprint plan", "Export tasks to Notion", "Recall last meeting tasks"
        </p>
      </div>
    </footer>
  );
};
