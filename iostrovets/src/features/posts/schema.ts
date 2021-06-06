import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  type Photo {
    url: URL!
    thumbnailUrl: URL
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    dateCreated: Date!
    photo: Photo
    comments: [Comment!]!
  }

  type PostsPaginated {
    data: [Post!]!
    info: PaginationInfo
  }

  input PostInput {
    title: String!
    body: String!
    userId: ID!
    dateCreated: Date!
    photo: Upload
  }

  input PatchPostInput {
    title: String
    body: String
    userId: ID
    dateCreated: Date
    photo: Upload
  }

  extend type Query {
    posts: [Post!]!
    postsPaginated(pageNumber: Int, pageSize: Int): PostsPaginated
    postById(id: ID!): Post
    postsByUser(userId: ID!): [Post!]!
  }

  extend type Mutation {
    createPost(body: PostInput!): Post
    updatePost(postId: ID!, body: PostInput!): Post
    patchPost(postId: ID!, body: PatchPostInput): Post
    deletePost(postId: ID!): Boolean
  }

  extend type Subscription {
    postCreated: Post
    postUpdated: Post
    postPatched: Post
    postDeleted: ID
  }
`;
