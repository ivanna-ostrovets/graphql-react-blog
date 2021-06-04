import { ASTNode, GraphQLScalarType, Kind } from 'graphql';

export const DateScalar = new GraphQLScalarType({
  name: 'Date',

  description: 'Date custom scalar type',

  serialize(value: Date) {
    return `${value.toLocaleDateString()}, ${value.toLocaleTimeString()}`;
  },

  parseValue(value: number | string | Date) {
    return new Date(value);
  },

  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});
