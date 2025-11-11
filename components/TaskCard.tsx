
import React from 'react';
import type { ActionItem, Priority } from '../types';

interface TaskCardProps {
  item: ActionItem;
}

const priorityStyles: Record<Priority, { bg: string; text: string }> = {
  Low: { bg: 'bg-sky-500/20', text: 'text-sky-400' },
  Medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  High: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  Urgent: { bg: 'bg-red-500/20', text: 'text-red-400' },
};

export const TaskCard: React.FC<TaskCardProps> = ({ item }) => {
  const styles = priorityStyles[item.priority] || priorityStyles.Medium;

  return (
    <div className="bg-base-300/50 rounded-lg p-4 border-l-4 border-brand-primary/80">
      <div className="flex justify-between items-start">
        <p className="font-bold text-content-100 flex-1 pr-4">{item.task}</p>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles.bg} ${styles.text}`}>
          {item.priority}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-content-200">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span>{item.owner}</span>
        </div>
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{item.deadline}</span>
        </div>
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            <span>{item.category}</span>
        </div>
      </div>
    </div>
  );
};
