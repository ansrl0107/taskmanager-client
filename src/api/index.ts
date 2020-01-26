import axios from 'axios';
import { Ticket, Task, User } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const getTickets = async () => {
  const res = await api.get('/tickets');
  return res.data.tickets as Ticket[];
};

export interface TaskBody {
  ticketId: string;
  content: string;
  workingTime: number;
}
export const addTask = async (data: TaskBody) => {
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
