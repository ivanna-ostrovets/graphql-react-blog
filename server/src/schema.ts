import { makeExecutableSchema } from 'apollo-server-express';
import { authResolvers, authTypeDefs } from './features/auth';
import { commentResolvers, commentTypeDefs } from './features/comments';
import { postResolvers, postTypeDefs } from './features/posts';
import { userResolvers, userTypeDefs } from './features/users';
import { resolvers } from './resolvers';
import { queryTypeDefs } from './typeDefs';

export const schema = makeExecutableSchema({
  typeDefs: [
    queryTypeDefs,
    authTypeDefs,
    postTypeDefs,
    userTypeDefs,
    commentTypeDefs,
  ],
  resolvers: [
    resolvers,
    authResolvers,
    postResolvers,
    userResolvers,
    commentResolvers,
  ],
});
