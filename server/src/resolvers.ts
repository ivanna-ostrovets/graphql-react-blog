import { IResolvers } from 'apollo-server';
import { EmailAddressResolver } from 'graphql-scalars';
import { GraphQLUpload } from 'graphql-upload';
import { DateScalar } from './shared/custom-scalars/date-scalar';
import { URLScalar } from './shared/custom-scalars/url';

export const resolvers: IResolvers = {
  EmailAddress: EmailAddressResolver,
  Date: DateScalar,
  URL: URLScalar,
  Upload: GraphQLUpload,
};
