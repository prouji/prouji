// src/components/UsersList.tsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { List } from 'antd';
 // Adjust the import path as needed
interface User {
    id: string;
    username: string;
    email: string;
}
const GET_USERS = gql`
  query users {
    users {
      id
      username
      email
    }
  }
`;

const UsersList: React.FC = () => {
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <List
      itemLayout="horizontal"
      dataSource={data?.users}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            title={<a href={`/users/${user.id}`}>{user.username}</a>}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
};

export default UsersList;
