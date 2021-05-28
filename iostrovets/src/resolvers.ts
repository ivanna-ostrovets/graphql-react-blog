import { EmailAddressResolver } from 'graphql-scalars';
import { DateScalar } from './custom-scalars/date-scalar';

export const resolvers = {
  Query: {
    users: () => [] as unknown[],
  },
  EmailAddress: EmailAddressResolver,
  Date: DateScalar,
};
