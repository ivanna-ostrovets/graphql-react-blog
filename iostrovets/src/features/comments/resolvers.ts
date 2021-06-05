import { IResolvers } from 'apollo-server';
import { pubsub } from '../../shared/utils/pubsub';

const events = {
  commentCreated: 'COMMENT_CREATED',
  commentUpdated: 'COMMENT_UPDATED',
  commentPatched: 'COMMENT_PATCHED',
  commentDeleted: 'COMMENT_DELETED',
};

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
  Comment: {
    user: (comment, args, { dataSources }) => {
      return dataSources.usersApi.getUserById(comment.userId);
    },
    post: (comment, args, { dataSources }) => {
      return dataSources.postsApi.getPostById(comment.postId);
    },
  },
  Mutation: {
    createComment: async (_, { body }, { dataSources }) => {
      const comment = await dataSources.commentsApi.createComment(body);

      await pubsub.publish(events.commentCreated, { commentCreated: comment });

      return comment;
    },
    updateComment: async (_, { commentId, body }, { dataSources }) => {
      const comment = dataSources.commentsApi.updateComment(commentId, body);

      await pubsub.publish(events.commentUpdated, { commentUpdated: comment });

      return comment;
    },
    patchComment: async (_, { commentId, body }, { dataSources }) => {
      const comment = dataSources.commentsApi.patchComment(commentId, body);

      await pubsub.publish(events.commentPatched, { commentPatched: comment });

      return comment;
    },
    deleteComment: async (_, { commentId }, { dataSources }) => {
      await dataSources.commentsApi.deleteComment(commentId);
      await pubsub.publish(events.commentDeleted, {
        commentDeleted: commentId,
      });

      return;
    },
  },
  Subscription: {
    commentCreated: {
      subscribe: () => pubsub.asyncIterator([events.commentCreated]),
    },
    commentUpdated: {
      subscribe: () => pubsub.asyncIterator([events.commentUpdated]),
    },
    commentPatched: {
      subscribe: () => pubsub.asyncIterator([events.commentPatched]),
    },
    commentDeleted: {
      subscribe: () => pubsub.asyncIterator([events.commentDeleted]),
    },
  },
};
