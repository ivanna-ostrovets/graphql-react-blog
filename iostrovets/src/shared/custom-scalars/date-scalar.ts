import { UserInputError } from 'apollo-server';
import { ASTNode, GraphQLScalarType, Kind } from 'graphql';

export const DateScalar = new GraphQLScalarType({
  name: 'Date',

  description: 'Date custom scalar type',

  serialize(value: number | string | Date) {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new UserInputError('Invalid date provided');
    }

    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  },

  parseValue(value: number | string | Date) {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new UserInputError('Invalid date provided');
    }

    return date;
  },

  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.INT) {
      const date = new Date(parseInt(ast.value, 10));

      if (isNaN(date.getTime())) {
        throw new UserInputError('Invalid date provided');
      }

      return date;
    }

    return null;
  },
});
