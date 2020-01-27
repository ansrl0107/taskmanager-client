import React, { FC, useState, CSSProperties } from 'react';
import { Modal, Input, message } from 'antd';
import { addProject } from '../api';

interface Props {
  onSuccess: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
const style: CSSProperties = {
  marginBottom: 16,
};
const AddProjectModal: FC<Props> = ({ setVisible, visible, onSuccess }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const saveProject = async () => {
    try {
      await addProject({ id, name, description });
      onSuccess();
      setVisible(false);
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <Modal
      title="Add Project"
      visible={visible}
      onOk={saveProject}
      onCancel={() => setVisible(false)}
    >
      <Input
        placeholder="Project ID"
        value={id}
        onChange={e => setId(e.target.value)}
        style={style}
      />
      <Input
        placeholder="Project name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={style}
      />
      <Input
        placeholder="Project description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
    </Modal>
  );
};

export default AddProjectModal;
