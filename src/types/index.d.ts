export interface Ticket {
  id: string;
  name: string;
  type: TicketType;
}

export interface User {
  id: string;
  name: string;
}

export enum TicketType {
  DEV = 'development',
  ISSUE = 'issue',
  BUG = 'bug',
}

export interface Task {
  readonly id: string;
  user: User;
  ticket: Ticket;
  content: string;
  workingTime: number;
}