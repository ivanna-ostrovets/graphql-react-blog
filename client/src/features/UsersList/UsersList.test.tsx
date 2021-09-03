import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import { GET_USERS, UsersList } from './UsersList';

it('renders users', async () => {
  const mock = {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [
          {
            id: '1',
            name: 'name 1',
            email: 'email 1',
            username: 'username 1',
            gender: 'gender 1',
          },
          {
            id: '2',
            name: 'name 2',
            email: 'email 2',
            username: 'username 2',
            gender: 'gender 2',
          },
        ],
      },
    },
  };

  const component = TestRenderer.create(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <UsersList />
    </MockedProvider>,
  );

  await new Promise((resolve) => setTimeout(resolve, 0));

  const userContainers = component.root.findAllByProps({
    className: 'userContainer',
  });
  expect(userContainers.length).toBe(2);
});
