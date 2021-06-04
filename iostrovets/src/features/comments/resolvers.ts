import { IResolvers } from 'apollo-server';

export const commentResolvers: IResolvers = {
  Query: {
    comments: (_, args, { dataSources }) => {
      return dataSources.commentsApi.getComments();
    },
    commentsPaginated: (_, { pageNumber, pageSize }, { dataSources }) => {
      return dataSources.commentsApi.getCommentsPaginated({
        pageNumber,
        pageSize,
      });
    },
    commentById: (_, { id }, { dataSources }) => {
      return dataSources.commentsApi.getCommentById(id);
    },
    commentsByUser: (_, { userId }, { dataSources }) => {
      return dataSources.commentsApi.getCommentsByUser(userId);
    },
    commentsByPost: (_, { postId }, { dataSources }) => {
      return dataSources.commentsApi.getCommentsByPost(postId);
    },
  },
  Mutation: {
    createComment: (_, { body }, { dataSources }) => {
      return dataSources.commentsApi.createComment(body);
    },
    updateComment: (_, { commentId, body }, { dataSources }) => {
      return dataSources.commentsApi.updateComment(commentId, body);
    },
    patchComment: (_, { commentId, body }, { dataSources }) => {
      return dataSources.commentsApi.patchComment(commentId, body);
    },
    deleteComment: async (_, { commentId }, { dataSources }) => {
      await dataSources.commentsApi.deleteComment(commentId);

      return;
    },
  },
  Comment: {
    user: (comment, args, { dataSources }) => {
      return dataSources.usersApi.getUserById(comment.userId);
    },
    post: (comment, args, { dataSources }) => {
      return dataSources.postsApi.getPostById(comment.postId);
    },
  },
};
