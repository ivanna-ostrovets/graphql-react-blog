import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar EmailAddress

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

  type Query {
    users: [User!]!
  }
`;
