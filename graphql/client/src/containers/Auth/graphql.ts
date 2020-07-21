import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation signUser($email: String!) {
    login(email: $email)
  }
`
