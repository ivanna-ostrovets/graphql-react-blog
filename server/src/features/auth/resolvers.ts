import { IResolvers } from 'apollo-server';

export const authResolvers: IResolvers = {
  Query: {
    profile: (parent, args, { dataSources }) => {
      return dataSources.authAPI.profile();
    },
  },
  Mutation: {
    login: (parent, args, { dataSources }) => {
      return dataSources.authAPI.login(args.email, args.password);
    },
  },
};
