import { ApolloServer, ServerInfo } from 'apollo-server';
import { FormatDateDirective } from './directives/format-date';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    FormatDate: FormatDateDirective,
  },
});

server.listen().then(({ url }: ServerInfo) => {
  console.log(`🚀 Server ready at ${url}`);
});
