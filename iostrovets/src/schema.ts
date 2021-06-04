import { gql } from 'apollo-server';

export const queryTypeDefs = gql`
  scalar EmailAddress
  scalar Date
  scalar URL

  directive @FormatDate on FIELD_DEFINITION

  enum Gender {
    FEMALE
    MALE
    OTHER
  }

  type User {
    id: ID!
    name: String!
    email: EmailAddress!
    gender: Gender!
    username: String
  }

  type Comment {
    id: ID!
    name: String!
    body: String!
    post: Post!
    user: User!
    dateCreated: String! @FormatDate
  }

  type UsersPaginated {
    data: [User!]!
    info: PaginationInfo
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

  input UserInput {
    name: String!
    email: EmailAddress!
    gender: Gender!
    username: String
  }

  input PatchUserInput {
    name: String
    email: EmailAddress
    gender: Gender
    username: String
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
    users: [User!]!
    usersPaginated(pageNumber: Int, pageSize: Int): UsersPaginated
    userById(id: ID!): User

    comments: [Comment!]!
    commentsPaginated(pageNumber: Int, pageSize: Int): CommentsPaginated
    commentById(id: ID!): Comment
    commentsByUser(userId: ID!): [Comment!]!
    commentsByPost(postId: ID!): [Comment!]!
  }

  type Mutation {
    createUser(body: UserInput!): User
    updateUser(userId: ID!, body: UserInput!): User
    patchUser(userId: ID!, body: PatchUserInput): User
    deleteUser(userId: ID!): Boolean
    createComment(body: CommentInput!): Comment
    updateComment(commentId: ID!, body: CommentInput!): Comment
    patchComment(commentId: ID!, body: PatchCommentInput): Comment
    deleteComment(commentId: ID!): Boolean
  }
`;
