import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar EmailAddress
  scalar Date
  scalar URL

  directive @FormatDate on FIELD_DEFINITION

  enum Gender {
    FEMALE
    MALE
    OTHER
  }

  type Photo {
    url: URL!
    thumbnailUrl: URL
  }

  type User {
    id: ID!
    name: String!
    email: EmailAddress!
    gender: Gender!
    username: String
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

  type Comment {
    id: ID!
    name: String!
    body: String!
    post: Post!
    email: EmailAddress!
    dateCreated: String! @FormatDate
  }

  type PostsPaginated {
    data: [Post!]!
    info: PaginationInfo
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

  input PostInput {
    title: String!
    body: String!
    userId: ID!
  }

  input PatchPostInput {
    title: String
    body: String
    userId: ID
  }

  input UserInput {
    name: String!
    email: EmailAddress!
    username: String
  }

  input PatchUserInput {
    name: String
    email: EmailAddress
    username: String
  }

  type Query {
    posts: [Post!]!
    postsPaginated(pageNumber: Int, pageSize: Int): PostsPaginated
    postById(id: ID!): Post
    postsByUser(userId: ID!): [Post!]!

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
    createPost(body: PostInput!): Post
    updatePost(postId: ID!, body: PostInput!): Post
    patchPost(postId: ID!, body: PatchPostInput): Post
    deletePost(postId: ID!): Boolean
    createUser(body: UserInput!): User
    updateUser(userId: ID!, body: UserInput!): User
    patchUser(userId: ID!, body: PatchUserInput): User
    deleteUser(userId: ID!): Boolean
  }
`;
