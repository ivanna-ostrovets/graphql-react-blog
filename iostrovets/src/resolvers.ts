import { IResolvers } from 'apollo-server';
import { EmailAddressResolver } from 'graphql-scalars';
import { DateScalar } from './shared/custom-scalars/date-scalar';
import { URLScalar } from './shared/custom-scalars/url';

export const resolvers: IResolvers = {
  Query: {
    users: (_, args, { dataSources }) => {
      return dataSources.blogApi.getUsers();
    },
    usersPaginated: (_, { pageNumber, pageSize }, { dataSources }) => {
      return dataSources.blogApi.getUsersPaginated({ pageNumber, pageSize });
    },
    userById: (_, { id }, { dataSources }) => {
      return dataSources.blogApi.getUserById(id);
    },

    comments: (_, args, { dataSources }) => {
      return dataSources.blogApi.getComments();
    },
    commentsPaginated: (_, { pageNumber, pageSize }, { dataSources }) => {
      return dataSources.blogApi.getCommentsPaginated({ pageNumber, pageSize });
    },
    commentById: (_, { id }, { dataSources }) => {
      return dataSources.blogApi.getCommentById(id);
    },
    commentsByUser: (_, { userId }, { dataSources }) => {
      return dataSources.blogApi.getCommentsByUser(userId);
    },
    commentsByPost: (_, { postId }, { dataSources }) => {
      return dataSources.blogApi.getCommentsByPost(postId);
    },
  },
  Mutation: {
    createUser: (_, { body }, { dataSources }) => {
      return dataSources.blogApi.createUser(body);
    },
    updateUser: (_, { userId, body }, { dataSources }) => {
      return dataSources.blogApi.updateUser(userId, body);
    },
    patchUser: (_, { userId, body }, { dataSources }) => {
      return dataSources.blogApi.patchUser(userId, body);
    },
    deleteUser: async (_, { userId }, { dataSources }) => {
      await dataSources.blogApi.deleteUser(userId);

      return;
    },
    createComment: (_, { body }, { dataSources }) => {
      return dataSources.blogApi.createComment(body);
    },
    updateComment: (_, { commentId, body }, { dataSources }) => {
      return dataSources.blogApi.updateComment(commentId, body);
    },
    patchComment: (_, { commentId, body }, { dataSources }) => {
      return dataSources.blogApi.patchComment(commentId, body);
    },
    deleteComment: async (_, { commentId }, { dataSources }) => {
      await dataSources.blogApi.deleteComment(commentId);

      return;
    },
  },
  Comment: {
    user: (comment, args, { dataSources }) => {
      return dataSources.blogApi.getUserById(comment.userId);
    },
    post: (comment, args, { dataSources }) => {
      return dataSources.postsApi.getPostById(comment.postId);
    },
  },
  EmailAddress: EmailAddressResolver,
  Date: DateScalar,
  URL: URLScalar,
};
