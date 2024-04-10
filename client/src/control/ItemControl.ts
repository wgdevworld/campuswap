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
  }
}
`;
