import { gql } from 'apollo-server';

export const queryTypeDefs = gql`
  scalar EmailAddress
  scalar Date
  scalar URL

  directive @FormatDate on FIELD_DEFINITION

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

  "Additional information returned from paginate function"
  type PaginationInfo {
    currentPage: Int!
    total: Int!
    pagesLeft: Int!
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

  type Query {
    comments: [Comment!]!
    commentsPaginated(pageNumber: Int, pageSize: Int): CommentsPaginated
    commentById(id: ID!): Comment
    commentsByUser(userId: ID!): [Comment!]!
    commentsByPost(postId: ID!): [Comment!]!
  }

  type Mutation {
    createComment(body: CommentInput!): Comment
    updateComment(commentId: ID!, body: CommentInput!): Comment
    patchComment(commentId: ID!, body: PatchCommentInput): Comment
    deleteComment(commentId: ID!): Boolean
  }
`;
