import axios from 'axios';
import { Ticket, Task, User, Project, TaskRequest, ProjectRequest, TicketRequest, UserRequest } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const addTask = async (data: TaskRequest) => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const res = await api.post('tasks', data, { headers });
    if (res.status !== 200) {
      throw new Error('API 오류입니다.');
    }
  } catch (err) {
    throw new Error('서버와 연결할 수 없습니다.');
  }
};

export const deleteTask = async (taskId: string) => {
  const res = await api.delete(`tasks/${taskId}`);
  return res.data.task;
};

export const getUserTasks = async (userId: string, date: string) => {
  const params = { userId, from: date, to: date };
  const res = await api.get('tasks', { params });
  return res.data.tasks as Task[];
};

export const getTeamTasks = async (teamId: string, from: string, to: string) => {
  const params = { from, to, teamId };
  const res = await api.get('tasks', { params });
  return res.data.tasks as Task[];
};

export const getTeamMembers = async (teamId: string) => {
  const res = await api.get(`teams/${teamId}/users`);
  return res.data.users as User[];
};

export const addTeamMember = async (data: UserRequest) => {
  const res = await api.post('users', data);
  return res.data.user as User;
};

export const login = async (email: string, password: string) => {
  const data = { email, password };
  try {
    const res = await api.post('auth/login', data);
    if (res.status === 404) {
      throw new Error('등록되지 않은 이메일입니다.');
    }
    if (res.status === 400) {
      throw new Error('틀린 비밀번호 입니다.');
    }
    if (res.status !== 200) {
      throw new Error('알 수 없는 오류입니다.');
    }
    return res;
  } catch (err) {
    throw new Error('서버와 연결할 수 없습니다.');
  }
};

export const getProjects = async () => {
  const res = await api.get('/projects');
  return res.data.projects as Project[];
};

export const addProject = async (data: ProjectRequest) => {
  const res = await api.post('/projects', data);
  return res.data.project as Project;
};

export const addTicket = async (data: TicketRequest) => {
  const res = await api.post('/tickets', data);
  return res.data.ticket as Ticket;
};

export const getTickets = async () => {
  const res = await api.get('/tickets');
  return res.data.tickets as Ticket[];
};
