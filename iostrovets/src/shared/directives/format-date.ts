import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';

export class FormatDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const date = new Date(await resolve.apply(this, args));

      return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
    };
  }
}
