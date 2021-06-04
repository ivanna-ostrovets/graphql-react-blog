import { IResolvers } from 'apollo-server';

export const postResolvers: IResolvers = {
  Query: {
    posts: (_, args, { dataSources }) => {
      return dataSources.postsApi.getPosts();
    },
    postsPaginated: (_, { pageNumber, pageSize }, { dataSources }) => {
      return dataSources.postsApi.getPostsPaginated({ pageNumber, pageSize });
    },
    postById: (_, { id }, { dataSources }) => {
      return dataSources.postsApi.getPostById(id);
    },
    postsByUser: (_, { userId }, { dataSources }) => {
      return dataSources.postsApi.getPostsByUser(userId);
    },
  },
  Mutation: {
    createPost: (_, { body }, { dataSources }) => {
      return dataSources.postsApi.createPost(body);
    },
    updatePost: (_, { postId, body }, { dataSources }) => {
      return dataSources.postsApi.updatePost(postId, body);
    },
    patchPost: (_, { postId, body }, { dataSources }) => {
      return dataSources.postsApi.patchPost(postId, body);
    },
    deletePost: async (_, { postId }, { dataSources }) => {
      await dataSources.postsApi.deletePost(postId);

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
  },
};
