import { gql } from '@apollo/client'

export const GET_ALL_BOOKS = gql`
  query getAllBooks {
    allBooks {
      id
      title
      author {
        firstname
        lastname
      }
    }
  }
`
