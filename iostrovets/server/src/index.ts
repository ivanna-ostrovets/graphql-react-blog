import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { graphqlUploadExpress } from 'graphql-upload';
import http from 'http';
import {
  AuthAPI,
  authMiddleware,
  getProfile,
  permissions,
} from './features/auth';
import { CommentsAPI } from './features/comments';
import { PostsAPI } from './features/posts';
import { UsersAPI } from './features/users';
import { schema } from './schema';
import { FormatDateDirective } from './shared/directives/format-date';
import { logger } from './shared/middlewares/logger';

dotenv.config();

async function startApolloServer() {
  const server: ApolloServer = new ApolloServer({
    schema: applyMiddleware(schema, logger, authMiddleware, permissions),
    dataSources: () => ({
      postsApi: new PostsAPI(),
      usersApi: new UsersAPI(),
      commentsApi: new CommentsAPI(),
      authAPI: new AuthAPI(),
    }),
    schemaDirectives: {
      FormatDate: FormatDateDirective,
    },
    context: async ({ req, connection }) => {
      const token = connection
        ? connection.context.Authorization
        : req.headers.authorization;
      const user = await getProfile(token);

      return {
        token,
        user,
      };
    },
    uploads: false,
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.APP_PORT }, resolve as any),
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.APP_PORT}${server.graphqlPath}`,
  );

  return { server, app, httpServer };
}

startApolloServer();
