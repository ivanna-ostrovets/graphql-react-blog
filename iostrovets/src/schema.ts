import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar EmailAddress
  scalar Date
  scalar URL

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
