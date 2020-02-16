import axios from 'axios';
import { Ticket, Task, User, Project, TaskRequest, ProjectRequest, TicketRequest, UserRequest, Plan } from '../types';

const accessToken = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${accessToken}`,
};
export const api = axios.create({
  headers,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// type APIMethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
// interface APIConfig {
//   data?: unknown;
//   params?: unknown;
// }
// const api2 = async (method: APIMethodType, url: string, config?: APIConfig) => {
//   const [state, setState] = useState({
//     data: undefined,
//     error: undefined,
//     isLoading: true,
//   });

//   const tokenExpiry = new Date(localStorage.getItem('tokenExpiry') as string);
//   if (tokenExpiry < new Date(Date.now() - 1000 * 60)) {
//     const refreshToken = localStorage.getItem('refreshToken') as string;
//     try {
//       const res = await api.post('auth/token', { refreshToken });
//       localStorage.setItem('accessToken', res.data.accessToken);
//     } catch (err) {
//       localStorage.removeItem('accessToken');
//     }
//   }

//   const fetch = async () => {
//     const data = config?.data;
//     const params = config?.params;

//     try {
//       const res = await api({ method, data, params, url });
//       setState({ ...state, data: res.data, isLoading: false });
//     } catch (error) {
//       setState({ ...state, error, isLoading: false });
//     }

//   };
//   useEffect(() => {
//     fetch();
//   });
//   return state;
// };

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

export const deleteTicket = async (ticketId: string) => {
  await api.delete(`tickets/${ticketId}`);
};

export const closeTicket = async (ticketId: string) => {
  await api.patch(`tickets/${ticketId}/close`);
};

export const addPlan = async (content: string, deadline: Date) => {
  const res = await api.post('plans', { content, deadline });
  return res.data.plan as Plan;
};

export const deletePlan = async (planId: string) => {
  await api.delete(`plans/${planId}`);
};

export const getUserPlans = async (userId: string) => {
  const res = await api.get(`users/${userId}/plans`);
  return res.data.plans as Plan[];
};

export const closePlan = async (planId: string) => {
  await api.patch(`plans/${planId}`, { state: 'close' });
};

export const openPlan = async (planId: string) => {
  await api.patch(`plans/${planId}`, { state: 'open' });
};
