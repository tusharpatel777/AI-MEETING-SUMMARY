
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Footer } from './components/Footer';
import { analyzeMeetingNotes } from './services/geminiService';
import type { MeetingAnalysis } from './types';
import { SYSTEM_INSTRUCTION } from './constants';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<MeetingAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessMeeting = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter meeting notes or a transcript.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeMeetingNotes(inputText, SYSTEM_INSTRUCTION);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <InputPanel
          inputText={inputText}
          setInputText={setInputText}
          onProcess={handleProcessMeeting}
          isLoading={isLoading}
        />
        <OutputPanel
          analysisResult={analysisResult}
          isLoading={isLoading}
          error={error}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
