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

  type Query {
    posts: [Post!]!
    postById(id: ID!): Post
    postsByUser(userId: ID!): [Post!]!

    users: [User!]!
    userById(id: ID!): User

    comments: [Comment!]!
    commentById(id: ID!): Comment
    commentsByUser(userId: ID!): [Comment!]!
    commentsByPost(postId: ID!): [Comment!]!
  }
`;
