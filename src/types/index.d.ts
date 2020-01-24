export interface Ticket {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
}

export enum TaskType {
  DEV = 'dev',
  ISSUE = 'issue',
  BUG = 'bug',
}

export interface Task {
  user: User;
  ticket: Ticket;
  type: TaskType;
  content: string;
  workingTime: number;
}