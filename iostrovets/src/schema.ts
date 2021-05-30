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
    users: [User!]!
    posts: [Post!]!
    comments: [Comment!]!
  }
`;
