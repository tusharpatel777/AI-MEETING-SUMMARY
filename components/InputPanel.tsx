
import React from 'react';
import { Spinner } from './Spinner';

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  onProcess: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ inputText, setInputText, onProcess, isLoading }) => {
  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg h-full flex flex-col sticky top-24">
      <h2 className="text-2xl font-bold mb-4">Meeting Input</h2>
      <p className="text-content-200 mb-4">
        Paste your meeting transcript, notes, or just type a voice command.
      </p>
      <textarea
        className="w-full flex-grow bg-base-300/50 border border-base-300 rounded-md p-3 text-content-100 placeholder-content-200/50 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none min-h-[300px] lg:min-h-[400px]"
        placeholder="e.g., 'John to follow up on the Q3 budget by Friday. Sarah mentioned the design mockups are blocked...'"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      <button
        onClick={onProcess}
        disabled={isLoading || !inputText.trim()}
        className="mt-6 w-full flex justify-center items-center bg-brand-primary hover:bg-brand-primary/90 disabled:bg-base-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <Spinner />
            Processing...
          </>
        ) : (
          'Process Meeting'
        )}
      </button>
    </div>
  );
};
