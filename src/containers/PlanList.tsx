import React, { FC } from 'react';
import { Plan } from '../types';
import { PlanItem } from '../components/PlanItem';
import { Divider, Col, Row } from 'antd';
import moment from 'moment';

interface Props {
  plans: Plan[];
  date: string;
  onClosePlan: (planId: string) => void;
  onOpenPlan: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
}
export const PlanList: FC<Props> = ({ plans, date, onClosePlan, onOpenPlan, onDeletePlan }) => {
  const renderPlan = (plan: Plan) => {
    return (
      <Col key={plan.id}>
        <PlanItem
          plan={plan}
          onOpen={onOpenPlan}
          onClose={onClosePlan}
          onDelete={onDeletePlan}
        />
      </Col>
    );
  };

  return (
    <Row style={{ marginBottom: 16  }}>
      <Divider>{moment(date).tz('Asia/Seoul').format('YYYY-MM-DD')}</Divider>
      <Row gutter={[8, 8]}>
        {plans.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(renderPlan)}
      </Row>
    </Row>
  );
};
