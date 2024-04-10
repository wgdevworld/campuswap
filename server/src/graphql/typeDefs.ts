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

  type Request {
    id: ID!
    fromUser: User!
    toUser: User!
    message: String
    wantItem: Item!
    offeredItems: [Item!]!
  }

  type Query {
    fetchAllUsers: [User!]!
    fetchUserById(id: ID!): User
    fetchAllItems: [Item!]!
    fetchItemById(id: ID!): Item
    fetchAllRequests: [Request!]!
    fetchRequestById(id: ID!): Request
    fetchSentRequests(userId: ID!): [Request!]!
    fetchReceivedRequests(userId: ID!): [Request!]!
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
    createRequest(
      fromUserId: ID!
      toUserId: ID!
      message: String
      wantItemId: ID!
      offeredItemIds: [ID!]!
    ): Request!
    deleteUser(id: ID!): User!
    deleteItem(id: ID!): Item!
    deleteRequest(id: ID!): Request!
  }
`;
