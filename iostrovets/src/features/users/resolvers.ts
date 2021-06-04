import { IResolvers } from 'apollo-server';

export const userResolvers: IResolvers = {
  Query: {
    users: (_, args, { dataSources }) => {
      return dataSources.usersApi.getUsers();
    },
    usersPaginated: (_, { pageNumber, pageSize }, { dataSources }) => {
      return dataSources.usersApi.getUsersPaginated({ pageNumber, pageSize });
    },
    userById: (_, { id }, { dataSources }) => {
      return dataSources.usersApi.getUserById(id);
    },
  },
  Mutation: {
    createUser: (_, { body }, { dataSources }) => {
      return dataSources.usersApi.createUser(body);
    },
    updateUser: (_, { userId, body }, { dataSources }) => {
      return dataSources.usersApi.updateUser(userId, body);
    },
    patchUser: (_, { userId, body }, { dataSources }) => {
      return dataSources.usersApi.patchUser(userId, body);
    },
    deleteUser: async (_, { userId }, { dataSources }) => {
      await dataSources.usersApi.deleteUser(userId);

      return;
    },
  },
};
