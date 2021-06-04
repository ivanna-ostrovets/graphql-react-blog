import { ApolloServer, ServerInfo } from 'apollo-server';
import { BlogAPI } from './blog-api-data-source';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { FormatDateDirective } from './shared/directives/format-date';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    blogApi: new BlogAPI(),
  }),
  schemaDirectives: {
    FormatDate: FormatDateDirective,
  },
});

server.listen().then(({ url }: ServerInfo) => {
  console.log(`🚀 Server ready at ${url}`);
});
