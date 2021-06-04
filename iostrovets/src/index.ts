import { ApolloServer, makeExecutableSchema, ServerInfo } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import {
  commentResolvers,
  CommentsAPI,
  commentTypeDefs,
} from './features/comments';
import { postResolvers, PostsAPI, postTypeDefs } from './features/posts';
import { userResolvers, UsersAPI, userTypeDefs } from './features/users';
import { resolvers } from './resolvers';
import { queryTypeDefs } from './schema';
import { FormatDateDirective } from './shared/directives/format-date';
import { logger } from './shared/middlewares/logger';

const schema = makeExecutableSchema({
  typeDefs: [queryTypeDefs, postTypeDefs, userTypeDefs, commentTypeDefs],
  resolvers: [resolvers, postResolvers, userResolvers, commentResolvers],
});

const server = new ApolloServer({
  schema: applyMiddleware(schema, logger),
  dataSources: () => ({
    postsApi: new PostsAPI(),
    usersApi: new UsersAPI(),
    commentsApi: new CommentsAPI(),
  }),
  schemaDirectives: {
    FormatDate: FormatDateDirective,
  },
});

server.listen().then(({ url }: ServerInfo) => {
  console.log(`🚀 Server ready at ${url}`);
});
