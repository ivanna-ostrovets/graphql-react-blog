import { gql } from 'apollo-server';

export const queryTypeDefs = gql`
  scalar EmailAddress
  scalar Date
  scalar URL
  scalar Upload

  directive @FormatDate on FIELD_DEFINITION

  "Additional information returned from paginate function"
  type PaginationInfo {
    currentPage: Int!
    total: Int!
    pagesLeft: Int!
  }

  type Query {
    _empty: Boolean
  }

  type Mutation {
    _empty: Boolean
  }

  type Subscription {
    _empty: Boolean
  }
`;
