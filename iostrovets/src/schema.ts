import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar EmailAddress
  scalar Date

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
