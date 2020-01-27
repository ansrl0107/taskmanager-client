import React, { FC, useState, useCallback, useEffect } from 'react';
import { Tabs, Row, Col, Card, Button } from 'antd';
import { Ticket, Project } from '../types';
import { AddTicketCard, AddProjectModal } from '../containers';
import { getProjects, getTickets } from '../api';

const { TabPane } = Tabs;

const colSize = {
  xs: 24,
  sm: 12,
  lg: 8,
  xl: 6,
};
const renderTicketCard = (ticket: Ticket) => {
  const { id, name, description } = ticket;
  return (
    <Col key={id} {...colSize}>
      <Card
        title={`[${id}] ${name}`}
        hoverable={true}
        style={{
          minHeight: 256,
        }}
      >
        {description}
      </Card>
    </Col>
  );
};
const ProjectPage: FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const loadProjectsCB = async () => {
    const projects = await getProjects();
    setProjects(projects);
  };
  const loadTicketsCB = async () => {
    const tickets = await getTickets();
    setTickets(tickets);
  };
  const loadProjects = useCallback(() => { loadProjectsCB(); }, []);
  const loadTickets = useCallback(() => { loadTicketsCB(); }, []);
  useEffect(() => { loadProjects(); }, [loadProjects]);
  useEffect(() => { loadTickets(); }, [loadTickets]);
  const renderProject = (project: Project) => {
    const { id, name } = project;

    const projectTickets = tickets.filter(ticket => ticket.project.id === id);
    return (
      <TabPane tab={`[${id.toUpperCase()}] ${name}`} key={id}>
        <Row gutter={[16, 16]}>
          {projectTickets.map(renderTicketCard)}
          <Col {...colSize}>
            <AddTicketCard projectId={id} onSuccess={loadTickets}/>
          </Col>
        </Row>
      </TabPane>
    );
  };
  const addProjectButton = (
    <Button type="link" icon="edit" onClick={() => setModalVisible(true)}>Add Project</Button>
  );
  return (
    <React.Fragment>
      <AddProjectModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onSuccess={loadProjects}
      />
      <Tabs tabBarExtraContent={addProjectButton}>
        {projects.map(renderProject)}
      </Tabs>
    </React.Fragment>
  );
};

export default ProjectPage;
