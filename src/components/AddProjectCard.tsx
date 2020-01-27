import React, { FC, CSSProperties, useState } from 'react';
import { Card, Input, Button, message } from 'antd';
import { addProject } from '../api';

interface Props {
  onClick: () => void;
  onSuccess: () => void;
}
const style: CSSProperties = {
  marginBottom: 16,
};
const AddProjectCard: FC<Props> = ({ onClick, onSuccess }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const onClickSave = async () => {
    if (id.trim().length === 0) {
      message.warning('프로젝트 ID를 입력해주세요.');
      return;
    }
    if (name.trim().length === 0) {
      message.warning('프로젝트 이름을 입력해주세요.');
      return;
    }
    if (description.trim().length === 0) {
      message.warning('프로젝트 설명을 입력해주세요.');
      return;
    }
    try {
      await addProject({ id, name, description });
      onSuccess();
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <Card hoverable={true} onClick={onClick} title="Add Project">
      <Input
        placeholder="Project ID"
        style={style}
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <Input
        placeholder="Project name"
        style={style}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input
        placeholder="Project description"
        style={style}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Button block={true} type="primary" icon="edit" onClick={onClickSave}>Save</Button>
    </Card>
  );
};

export default AddProjectCard;
