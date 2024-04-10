import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    contactInfo: String!
    items: [Item!]!
  }

  type Item {
    id: ID!
    name: String!
    description: String
    boughtFor: Float!
    usedFor: String!
    owner: User!
  }

  type Query {
    allUsers: [User!]!
    userById(id: ID!): User
    allItems: [Item!]!
    itemById(id: ID!): Item
  }

  type Mutation {
    createUser(email: String!, password: String!, contactInfo: String!): User!
    createItem(
      name: String!
      description: String
      boughtFor: Float!
      usedFor: String!
      ownerId: ID!
    ): Item!
  }
`;
