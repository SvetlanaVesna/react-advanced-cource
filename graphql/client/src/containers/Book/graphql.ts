import gql from 'graphql-tag'

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
      authors {
        id
        lastname
        firstname
      }
    }
  }
`
