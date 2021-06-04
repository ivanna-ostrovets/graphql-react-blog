import { gql } from 'apollo-server';

export const commentTypeDefs = gql`
  type Comment {
    id: ID!
    name: String!
    body: String!
    post: Post!
    user: User!
    dateCreated: String! @FormatDate
  }

  type CommentsPaginated {
    data: [Comment!]!
    info: PaginationInfo
  }

  input CommentInput {
    name: String!
    body: String!
    postId: ID!
    userId: ID!
    dateCreated: Date!
  }

  input PatchCommentInput {
    name: String
    body: String
    postId: ID
    userId: ID
    dateCreated: Date
  }

  extend type Query {
    comments: [Comment!]!
    commentsPaginated(pageNumber: Int, pageSize: Int): CommentsPaginated
    commentById(id: ID!): Comment
    commentsByUser(userId: ID!): [Comment!]!
    commentsByPost(postId: ID!): [Comment!]!
  }

  extend type Mutation {
    createComment(body: CommentInput!): Comment
    updateComment(commentId: ID!, body: CommentInput!): Comment
    patchComment(commentId: ID!, body: PatchCommentInput): Comment
    deleteComment(commentId: ID!): Boolean
  }
`;
