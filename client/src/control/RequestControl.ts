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
