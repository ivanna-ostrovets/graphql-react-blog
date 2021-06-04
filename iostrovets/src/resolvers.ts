import { IResolvers } from 'apollo-server';
import { EmailAddressResolver } from 'graphql-scalars';
import { DateScalar } from './custom-scalars/date-scalar';
import { URLScalar } from './custom-scalars/url';

export const resolvers: IResolvers = {
  Query: {
    posts: (parent, args, { dataSources }) => {
      return dataSources.blogApi.getPosts();
    },
    postsPaginated: (parent, { pageNumber, pageSize }, { dataSources }) => {
      return dataSources.blogApi.getPostsPaginated({ pageNumber, pageSize });
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
    usersPaginated: (parent, { pageNumber, pageSize }, { dataSources }) => {
      return dataSources.blogApi.getUsersPaginated({ pageNumber, pageSize });
    },
    userById: (parent, { id }, { dataSources }) => {
      return dataSources.blogApi.getUserById(id);
    },

    comments: (parent, args, { dataSources }) => {
      return dataSources.blogApi.getComments();
    },
    commentsPaginated: (parent, { pageNumber, pageSize }, { dataSources }) => {
      return dataSources.blogApi.getCommentsPaginated({ pageNumber, pageSize });
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
  Mutation: {
    createPost: (_, { body }, { dataSources }) => {
      return dataSources.blogApi.createPost(body);
    },
    updatePost: (_, { postId, body }, { dataSources }) => {
      return dataSources.blogApi.updatePost(postId, body);
    },
    patchPost: (_, { postId, body }, { dataSources }) => {
      return dataSources.blogApi.patchPost(postId, body);
    },
    deletePost: async (_, { postId }, { dataSources }) => {
      await dataSources.blogApi.deletePost(postId);

      return;
    },
  },
  Post: {
    user: (post, args, { dataSources }) => {
      return dataSources.blogApi.getUserById(post.userId);
    },
    comments: (post, args, { dataSources }) => {
      return dataSources.blogApi.getCommentsByPost(post.id);
    },
    photo: (post, args, { dataSources }) => {
      return dataSources.blogApi.getPhoto();
    },
  },
  EmailAddress: EmailAddressResolver,
  Date: DateScalar,
  URL: URLScalar,
};
