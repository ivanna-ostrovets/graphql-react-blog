import { IResolvers } from 'apollo-server';
import { pubsub } from '../../shared/utils/pubsub';
import { readFileToBuffer } from '../../shared/utils/readFileToBuffer';

const events = {
  postCreated: 'POST_CREATED',
  postUpdated: 'POST_UPDATED',
  postPatched: 'POST_PATCHED',
  postDeleted: 'POST_DELETED',
};

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
  Post: {
    user: (post, args, { dataSources }) => {
      return dataSources.usersApi.loader.load(post.userId);
    },
    comments: (post, args, { dataSources }) => {
      return dataSources.commentsApi.getCommentsByPost(post.id);
    },
  },
  Mutation: {
    createPost: async (_, { body: { image, ...body } }, { dataSources }) => {
      let post = await dataSources.postsApi.createPost(body);

      if (image) {
        const imageUrls = await dataSources.postsApi.uploadPostImage(
          post.id,
          await readFileToBuffer(image),
        );

        post = await dataSources.postsApi.patchPost(post.id, {
          image: imageUrls,
        });
      }

      await pubsub.publish(events.postCreated, { postCreated: post });

      return post;
    },
    updatePost: async (_, { postId, body }, { dataSources }) => {
      let imageUrls;

      if (body.image) {
        imageUrls = await dataSources.postsApi.uploadPostImage(
          postId,
          await readFileToBuffer(body.image),
        );
      }

      const post = dataSources.postsApi.updatePost(postId, {
        ...body,
        image: imageUrls,
      });

      await pubsub.publish(events.postUpdated, { postUpdated: post });

      return post;
    },
    patchPost: async (_, { postId, body }, { dataSources }) => {
      let imageUrls;

      if (body.image) {
        imageUrls = await dataSources.postsApi.uploadPostImage(
          postId,
          await readFileToBuffer(body.image),
        );
      }

      const post = dataSources.postsApi.patchPost(postId, {
        ...body,
        image: imageUrls,
      });

      await pubsub.publish(events.postPatched, { postPatched: post });

      return post;
    },
    deletePost: async (_, { postId }, { dataSources }) => {
      await dataSources.postsApi.deletePost(postId);

      const posts = await dataSources.postsApi.getPosts();
      await pubsub.publish(events.postDeleted, { postDeleted: posts });

      return;
    },
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(events.postCreated),
    },
    postUpdated: {
      subscribe: () => pubsub.asyncIterator(events.postUpdated),
    },
    postPatched: {
      subscribe: () => pubsub.asyncIterator(events.postPatched),
    },
    postDeleted: {
      subscribe: () => pubsub.asyncIterator(events.postDeleted),
    },
  },
};
