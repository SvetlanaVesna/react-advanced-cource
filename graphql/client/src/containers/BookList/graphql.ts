import gql from 'graphql-tag'

export const GET_ALL_BOOKS = gql`
  query getAllBooks {
    allBooks {
      id
      title
      authors {
        firstname
        lastname
      }
    }
  }
`
