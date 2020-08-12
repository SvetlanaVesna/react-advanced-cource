import { gql } from '@apollo/client'

export const GET_BOOK_BY_ID = gql`
  query getBook($id: ID!) {
    getBook(id: $id) {
      id
      description
      title
      pubDate
      comments {
        id
        text
      }
      author {
        id
        lastname
        firstname
      }
    }
  }
`
