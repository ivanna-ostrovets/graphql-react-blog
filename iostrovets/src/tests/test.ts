import { ApolloServer, gql } from 'apollo-server';
import { PostsAPI } from '../features/posts';
import { UsersAPI } from '../features/users';
import { schema } from '../schema';

const post = {
  id: '1',
  title: 'title',
  userId: '1',
};
const user = {
  id: '1',
  name: 'name',
};

it('Fetches post with user', async () => {
  const postsApi = new PostsAPI();
  const usersApi = new UsersAPI();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({ postsApi, usersApi }),
    context: () => ({
      user: { id: 1, email: 'example@email.com' },
      token: 'token',
    }),
  });

  postsApi.getPostById = jest.fn().mockResolvedValue(post);
  usersApi.getUserByIds = jest.fn().mockResolvedValue([user]);

  const GET_POST = gql`
    query {
      postById(id: "1") {
        id
        title
        user {
          id
          name
        }
      }
    }
  `;

  const response = await server.executeOperation({ query: GET_POST });

  expect(response).toMatchSnapshot();

  expect(usersApi.getUserByIds).toHaveBeenCalledWith(['1']);
  expect(postsApi.getPostById).toHaveBeenCalledWith('1');
});
