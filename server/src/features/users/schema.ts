import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  enum Gender {
    FEMALE
    MALE
    OTHER
  }

  enum Role {
    ADMIN
    USER
  }

  type User {
    id: ID!
    name: String!
    password: String!
    email: EmailAddress!
    gender: Gender!
    role: Role!
    username: String
  }

  type UsersPaginated {
    data: [User!]!
    info: PaginationInfo
  }

  input UserInput {
    name: String!
    email: EmailAddress!
    password: String!
    gender: Gender!
    role: Role!
    username: String
  }

  input PatchUserInput {
    name: String
    email: EmailAddress
    gender: Gender
    username: String
    password: String
  }

  extend type Query {
    users: [User!]!
    usersPaginated(pageNumber: Int, pageSize: Int): UsersPaginated
    userById(id: ID!): User
  }

  extend type Mutation {
    createUser(body: UserInput!): User
    updateUser(userId: ID!, body: UserInput!): User
    patchUser(userId: ID!, body: PatchUserInput): User
    deleteUser(userId: ID!): Boolean
  }
`;
