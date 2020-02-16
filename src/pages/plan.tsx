import React, { FC, useState, useEffect, useCallback } from 'react';

import { PlanList } from '../containers';
import { PlanInput } from '../components';
import { api } from '../api';
import { Plan } from '../types';
import { Layout } from 'antd';

const PlanPage: FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const loadUserPlans = async () => {
    const userId = localStorage.getItem('userId') as string;
    const res = await api.get(`users/${userId}/plans`);
    setPlans(res.data.plans);
  };

  console.log(plans);

  const cb = useCallback(() => loadUserPlans(), []);

  useEffect(() => { cb(); }, [cb]);

  interface GroupedPlans {
    [deadline: string]: Plan[];
  }
  const initialGroupedPlans: GroupedPlans = {};
  const groupByDeadline = (acc: GroupedPlans, cur: Plan) => {
    const { deadline } = cur;
    if (acc[deadline]) {
      acc[deadline].push(cur);
    } else {
      acc[deadline] = [cur];
    }
    return acc;
  };

  const groupedPlan = plans.reduce(groupByDeadline, initialGroupedPlans);

  const deletePlan = async (planId: string) => {
    await api.delete(`plans/${planId}`);
    const changedPlans = plans.filter(p => p.id !== planId);
    setPlans(changedPlans);
  };

  const closePlan = async (planId: string) => {
    const res = await api.patch(`plans/${planId}`, { state: 'close' });
    const changedPlans = [...plans.filter(p => p.id !== planId), res.data.plan as Plan];
    setPlans(changedPlans);
  };

  const openPlan = async (planId: string) => {
    const res = await api.patch(`plans/${planId}`, { state: 'open' });
    const changedPlans = [...plans.filter(p => p.id !== planId), res.data.plan as Plan];
    setPlans(changedPlans);
  };

  interface PlanBody {
    content: string;
    deadline: string;
  }
  const addPlan = async (body: PlanBody) => {
    const res = await api.post('plans', body);
    const changedPlans = [...plans, res.data.plan as Plan];
    setPlans(changedPlans);
  };

  const renderPlanLists = (deadline: string) => (
    <PlanList
      key={deadline}
      plans={groupedPlan[deadline]}
      date={deadline}
      onClosePlan={closePlan}
      onOpenPlan={openPlan}
      onDeletePlan={deletePlan}
    />
  );
  return (
    <React.Fragment>
      <Layout style={{ height: '100%' }}>
        <Layout.Content style={{ padding: 16, overflowY: 'auto' }}>
          {Object.keys(groupedPlan).sort((a, b) => (a > b) ? 1 : -1).map(renderPlanLists)}
        </Layout.Content>
        <Layout.Sider width={256} style={{ height: '100vh' }} breakpoint="md" collapsedWidth={0}>
          <PlanInput addPlan={addPlan}/>
        </Layout.Sider>
      </Layout>
    </React.Fragment>
  );
};

export default PlanPage;
