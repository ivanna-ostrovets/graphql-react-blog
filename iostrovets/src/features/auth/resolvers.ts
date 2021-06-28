import { IResolvers } from 'apollo-server';

export const authResolvers: IResolvers = {
  Mutation: {
    login: async (parent, args, { dataSources }) => {
      return await dataSources.authAPI.login(args.email, args.password);
    },
  },
};
