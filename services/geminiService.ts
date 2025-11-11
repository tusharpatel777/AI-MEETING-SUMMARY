
import { GoogleGenAI, Type } from "@google/genai";
import type { MeetingAnalysis } from '../types';

// This is a simplified schema. A real-world application might need more robust validation.
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    meeting_summary: { type: Type.STRING },
    key_decisions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    action_items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          task: { type: Type.STRING },
          owner: { type: Type.STRING },
          priority: { type: Type.STRING },
          deadline: { type: Type.STRING },
          category: { type: Type.STRING },
          status: { type: Type.STRING },
        },
        required: ['task', 'owner', 'priority', 'deadline', 'category', 'status']
      },
    },
    follow_up_questions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    memory_updates: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    calendar_events: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          date: { type: Type.STRING },
          reminder: { type: Type.STRING },
        },
        required: ['title', 'date', 'reminder']
      },
    },
    notion_trello_schema: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                Title: { type: Type.STRING },
                Status: { type: Type.STRING },
                Owner: { type: Type.STRING },
                'Due Date': { type: Type.STRING },
                Tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                Notes: { type: Type.STRING },
            },
            required: ['Title', 'Status', 'Owner', 'Due Date', 'Tags', 'Notes']
        },
    },
  },
  required: ['meeting_summary', 'key_decisions', 'action_items', 'follow_up_questions', 'memory_updates', 'calendar_events', 'notion_trello_schema'],
};

export const analyzeMeetingNotes = async (notes: string, systemInstruction: string): Promise<MeetingAnalysis> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: {
          parts: [{ text: `Process the following meeting notes:\n\n---\n\n${notes}` }]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as MeetingAnalysis;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API_KEY')) {
        throw new Error('Invalid API Key. Please check your configuration.');
    }
    throw new Error("Failed to process meeting notes with Gemini API.");
  }
};
