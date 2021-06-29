import { gql } from 'apollo-server';

export const authTypeDefs = gql`
  extend type Mutation {
    login(email: EmailAddress!, password: String!): String
  }
`;
