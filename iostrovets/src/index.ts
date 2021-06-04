import { ApolloServer, ServerInfo } from 'apollo-server';
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

const server = new ApolloServer({
  typeDefs: [queryTypeDefs, postTypeDefs, userTypeDefs, commentTypeDefs],
  resolvers: [resolvers, postResolvers, userResolvers, commentResolvers],
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
