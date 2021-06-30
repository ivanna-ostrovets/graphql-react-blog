import { gql } from 'apollo-server';

export const authTypeDefs = gql`
  extend type Query {
    profile: User
  }
  
  extend type Mutation {
    login(email: EmailAddress!, password: String!): String
  }
`;
