import gql from "graphql-tag";

export const CREATE_REQUEST_MUTATION = gql`
  mutation createRequest(
    $fromUserId: ID!
    $toUserId: ID!
    $message: String
    $wantItemId: ID!
    $offeredItemIds: [ID!]!
  ) {
    createRequest(
      fromUserId: $fromUserId
      toUserId: $toUserId
      message: $message
      wantItemId: $wantItemId
      offeredItemIds: $offeredItemIds
    ) {
      id
    }
  }
`;

export const FETCH_RECEIVED_REQUESTS_QUERY = gql`
  query fetchReceivedRequests($userId: ID!) {
    fetchReceivedRequests(userId: $userId) {
      id
      fromUser {
        email
        contactInfo
      }
      toUser {
        email
      }
      message
      wantItem {
        imageUrl
      }
      offeredItems {
        name
        description
        boughtFor
        usedFor
        imageUrl
      }
    }
  }
`;

export const DELETE_REQUEST_MUTATION = gql`
  mutation deleteRequest($id: ID!) {
    deleteRequest(id: $id) {
      id
    }
  }
`;

export const ACCEPT_REQUEST_MUTATION = gql`
  mutation acceptRequest($requestId: ID!) {
    acceptRequest(requestId: $requestId) {
      id
    }
  }
`
