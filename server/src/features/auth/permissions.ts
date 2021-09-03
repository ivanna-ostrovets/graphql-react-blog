import { allow, or, rule, shield } from 'graphql-shield';

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, context) => context.user.role === 'ADMIN',
);

const isUser = rule({ cache: 'contextual' })(
  async (parent, args, context) => context.user.role === 'USER',
);

export const permissions = shield(
  {
    Query: {
      '*': or(isUser, isAdmin),
      users: isAdmin,
      usersPaginated: isAdmin,
      userById: isAdmin,
    },
    Mutation: {
      '*': or(isUser, isAdmin),
      login: allow,
      deleteUser: isAdmin,
    },
    Subscription: {
      '*': or(isUser, isAdmin),
    },
  },
  { allowExternalErrors: true },
);
