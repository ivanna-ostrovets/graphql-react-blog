import { ASTNode, GraphQLScalarType, Kind } from 'graphql';

export const URLScalar = new GraphQLScalarType({
  name: 'URL',

  description: 'URL custom scalar type',

  serialize: (value: string) => (value ? new URL(value) : null),

  parseValue: (value: string) => (value ? new URL(value) : null),

  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.STRING && ast.value) {
      return new URL(ast.value);
    }

    return null;
  },
});
