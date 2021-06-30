import { gql, useQuery } from '@apollo/client';
import styles from './UsersList.module.css';

const GET_USERS = gql`
  query GetPosts {
    users {
      id
      name
      email
      username
      gender
    }
  }
`;

export function UsersList() {
  const { data } = useQuery(GET_USERS);

  return (
    <div>
      <h1>Users</h1>

      {data?.users.map((user: any) => (
        <div key={user.id} className={styles.userContainer}>
          <div className={styles.user}>
            <div>
              {user.name} ({user.email})
            </div>

            <div>Nickname: {user.username}</div>

            <div>Gender: {user.gender}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
