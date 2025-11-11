
import React from 'react';
import type { MeetingAnalysis } from '../types';
import { Section } from './Section';
import { TaskCard } from './TaskCard';
import { Spinner } from './Spinner';
import { CalendarIcon, CheckCircleIcon, ClipboardListIcon, DocumentTextIcon, LightBulbIcon, QuestionMarkCircleIcon, SparklesIcon, TableIcon } from './IconComponents';

interface OutputPanelProps {
  analysisResult: MeetingAnalysis | null;
  isLoading: boolean;
  error: string | null;
}

const Placeholder: React.FC = () => (
    <div className="text-center text-content-200 h-full flex flex-col justify-center items-center">
        <SparklesIcon className="w-16 h-16 mb-4 text-brand-secondary opacity-50" />
        <h3 className="text-xl font-semibold">AI Assistant is ready</h3>
        <p className="mt-2 max-w-md">Your meeting insights, decisions, and tasks will appear here once processed.</p>
    </div>
);

export const OutputPanel: React.FC<OutputPanelProps> = ({ analysisResult, isLoading, error }) => {
  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg min-h-[500px] flex flex-col">
      {isLoading && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <Spinner size="lg" />
          <p className="mt-4 text-lg font-semibold animate-pulse">Analyzing your meeting...</p>
          <p className="text-content-200 mt-2">Extracting insights and action items.</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center flex-grow text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold">An Error Occurred</h3>
            <p className="mt-2">{error}</p>
        </div>
      )}
      {!isLoading && !error && !analysisResult && <Placeholder />}
      {analysisResult && (
        <div className="space-y-6">
          <Section title="Meeting Summary" icon={<DocumentTextIcon />}>
            <p className="text-content-200">{analysisResult.meeting_summary}</p>
          </Section>

          <Section title="Key Decisions" icon={<CheckCircleIcon />}>
            <ul className="list-disc list-inside space-y-2 text-content-200">
              {analysisResult.key_decisions.map((decision, index) => <li key={index}>{decision}</li>)}
            </ul>
          </Section>

          <Section title="Action Items" icon={<ClipboardListIcon />}>
            <div className="space-y-4">
              {analysisResult.action_items.map((item, index) => <TaskCard key={index} item={item} />)}
            </div>
          </Section>

          <Section title="Calendar Events" icon={<CalendarIcon />}>
            <ul className="space-y-2 text-content-200">
                {analysisResult.calendar_events.map((event, index) => (
                    <li key={index} className="p-3 bg-base-300/50 rounded-md">
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm">Date: {event.date} | Reminder: {event.reminder}</p>
                    </li>
                ))}
            </ul>
          </Section>
          
          <Section title="Notion/Trello Cards" icon={<TableIcon />}>
             <div className="bg-base-300/50 p-4 rounded-md overflow-x-auto">
                <pre className="text-sm text-content-100 whitespace-pre-wrap">
                    <code>{JSON.stringify(analysisResult.notion_trello_schema, null, 2)}</code>
                </pre>
             </div>
          </Section>

          <Section title="Follow-up Questions" icon={<QuestionMarkCircleIcon />}>
            <ul className="list-disc list-inside space-y-2 text-content-200">
              {analysisResult.follow_up_questions.map((q, index) => <li key={index}>{q}</li>)}
            </ul>
          </Section>

          <Section title="Memory Updates" icon={<LightBulbIcon />}>
            <ul className="list-disc list-inside space-y-2 text-content-200">
              {analysisResult.memory_updates.map((update, index) => <li key={index}>{update}</li>)}
            </ul>
          </Section>
        </div>
      )}
    </div>
  );
};
