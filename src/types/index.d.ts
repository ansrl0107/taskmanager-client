export interface Ticket {
  readonly id: string;
  project: Project;
  name: string;
  description: string;
  type: TicketType;
  prioriy: number;
  readonly closedAt: Date;
}

export interface User {
  teamId: string;
  email: string;
  password: string;
  name: string;
  readonly id: boolean;
  readonly isLeader: boolean;
}

export interface UserRequest {
  teamId: string;
  email: string;
  password: string;
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
  createdAt: Date;
}

export interface TaskRequest {
  content: string;
  workingTime: number;
  ticketId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  readonly createdAt: Date;
}

export interface ProjectRequest {
  id: string;
  name: string;
  description: string;
}

export interface TicketRequest {
  projectId: string;
  name: string;
  description: string;
  type: TicketType;
  priority: number;
}

export interface Plan {
  id: string;
  deadline: string; // YYYY-MM-DD
  content: string;
  closedAt: Date;
  createdAt: Date;
}