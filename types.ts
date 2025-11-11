
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type Category = 'Development' | 'Marketing' | 'Ops' | 'Product' | 'General';
export type Status = 'Pending' | 'In Progress' | 'Done' | 'Blocked';

export interface ActionItem {
  task: string;
  owner: string;
  priority: Priority;
  deadline: string;
  category: Category;
  status: Status;
}

export interface CalendarEvent {
  title: string;
  date: string;
  reminder: string;
}

export interface NotionTrelloCard {
  Title: string;
  Status: string;
  Owner: string;
  'Due Date': string;
  Tags: string[];
  Notes: string;
}

export interface MeetingAnalysis {
  meeting_summary: string;
  key_decisions: string[];
  action_items: ActionItem[];
  follow_up_questions: string[];
  memory_updates: string[];
  calendar_events: CalendarEvent[];
  notion_trello_schema: NotionTrelloCard[];
}
