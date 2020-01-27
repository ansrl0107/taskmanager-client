import React, { FC, useState, useCallback, useEffect } from 'react';
import { addTeamMember, getTeamMembers } from '../api';
import { User } from '../types';

/**
 * 1. 멤버조회
 * 2. 멤버추가
 */
const TeamPage: FC = () => {
  return (
    <MemberList/>
  );
};

const MemberList: FC = () => {
  const [members, setMembers] = useState<User[]>([]);
  const loadTeamMembers = async () => {
    const members = await getTeamMembers('dev');
    setMembers(members);
  };
  const loadTeamMembersCB = useCallback(() => { loadTeamMembers(); }, []);
  useEffect(loadTeamMembersCB, [loadTeamMembersCB]);
  const renderMember = (user: User) => {
    return <div>{user.name}</div>;
  };
  return (
    <div>{members.map(renderMember)}</div>
  );
};

const MemberInput = () => {

};

export default TeamPage;
