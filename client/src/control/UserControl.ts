import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $contactInfo: String!
) {
    createUser(
        email: $email
        password: $password
        contactInfo: $contactInfo
    ) {
      id
      verified
    }
  }
`;
