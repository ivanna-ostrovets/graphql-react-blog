import { EmailAddressResolver } from 'graphql-scalars';
import { DateScalar } from './custom-scalars/date-scalar';
import { URLScalar } from './custom-scalars/url';

export const resolvers = {
  Query: {
    users: () => [] as unknown[],
    posts: () => [] as unknown[],
    comments: () => [] as unknown[],
  },
  EmailAddress: EmailAddressResolver,
  Date: DateScalar,
  URL: URLScalar,
};
