import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { graphqlUploadExpress } from 'graphql-upload';
import http from 'http';
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

async function startApolloServer() {
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
    introspection: true,
    uploads: false,
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve as any),
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  return { server, app, httpServer };
}

startApolloServer();
