import gql from 'graphql-tag'

export const GET_AUTHOR_LIST = gql`
  query getAllAuthors{
    allAuthors {
      id
      lastname
      firstname
      books {
        id
      }
    }
  }
`
