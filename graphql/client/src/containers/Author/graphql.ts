import gql from 'graphql-tag'

export const GET_AUTHOR_BY_ID = gql`
  query getAuthor($id: ID!) {
    getAuthor(id: $id) {
      id
      bio
      firstname
      lastname
      middlename
      books {
        id
        pubDate
        description
        title
      }
    }
  }
`
