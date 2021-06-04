import { ApolloServer, ServerInfo } from 'apollo-server';
import { BlogAPI } from './blog-api-data-source';
import { postResolvers, PostsAPI, postTypeDefs } from './features/posts';
import { userResolvers, UsersAPI, userTypeDefs } from './features/users';
import { resolvers } from './resolvers';
import { queryTypeDefs } from './schema';
import { FormatDateDirective } from './shared/directives/format-date';

const server = new ApolloServer({
  typeDefs: [queryTypeDefs, postTypeDefs, userTypeDefs],
  resolvers: [resolvers, postResolvers, userResolvers],
  dataSources: () => ({
    blogApi: new BlogAPI(),
    postsApi: new PostsAPI(),
    usersApi: new UsersAPI(),
  }),
  schemaDirectives: {
    FormatDate: FormatDateDirective,
  },
});

server.listen().then(({ url }: ServerInfo) => {
  console.log(`🚀 Server ready at ${url}`);
});
