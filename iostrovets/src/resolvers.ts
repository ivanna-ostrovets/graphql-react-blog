import { IResolvers } from 'apollo-server';
import { EmailAddressResolver } from 'graphql-scalars';
import { DateScalar } from './custom-scalars/date-scalar';
import { URLScalar } from './custom-scalars/url';

export const resolvers: IResolvers = {
  Query: {
    posts: (parent, args, { dataSources }) => {
      return dataSources.blogApi.getPosts();
    },
    postById: (parent, { id }, { dataSources }) => {
      return dataSources.blogApi.getPostById(id);
    },
    postsByUser: (parent, { userId }, { dataSources }) => {
      return dataSources.blogApi.getPostsByUser(userId);
    },

    users: (parent, args, { dataSources }) => {
      return dataSources.blogApi.getUsers();
    },
    userById: (parent, { id }, { dataSources }) => {
      return dataSources.blogApi.getUserById(id);
    },

    comments: (parent, args, { dataSources }) => {
      return dataSources.blogApi.getComments();
    },
    commentById: (parent, { id }, { dataSources }) => {
      return dataSources.blogApi.getCommentById(id);
    },
    commentsByUser: (parent, { userId }, { dataSources }) => {
      return dataSources.blogApi.getCommentsByUser(userId);
    },
    commentsByPost: (parent, { postId }, { dataSources }) => {
      return dataSources.blogApi.getCommentsByPost(postId);
    },
  },
  EmailAddress: EmailAddressResolver,
  Date: DateScalar,
  URL: URLScalar,
};
