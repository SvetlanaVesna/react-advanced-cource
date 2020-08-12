import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation signUser($email: String!) {
    login(email: $email)
  }
`
