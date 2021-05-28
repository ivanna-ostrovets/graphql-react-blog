import { EmailAddressResolver } from 'graphql-scalars';

export const resolvers = {
  Query: {
    users: () => [] as unknown[],
  },
  EmailAddress: EmailAddressResolver,
};
