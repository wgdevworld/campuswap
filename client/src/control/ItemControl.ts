import gql from "graphql-tag";

export const FETCH_ALL_ITEMS_QUERY = gql`
  query fetchAllItems {
    fetchAllItems {
      id
      name
      description
      boughtFor
      usedFor
      owner {
        id
        email
      }
      imageUrl
    }
  }
`;

export const CREATE_ITEM_MUTATION = gql`
  mutation createItem(
    $name: String!
    $description: String
    $boughtFor: Float!
    $usedFor: String!
    $ownerId: ID!
    $imageUrl: String!
  ) {
    createItem(
      name: $name
      description: $description
      boughtFor: $boughtFor
      usedFor: $usedFor
      ownerId: $ownerId
      imageUrl: $imageUrl
    ) {
      id 
    }
  }
`;
