import { gql } from '@apollo/client'

export const GET_AUTHOR_LIST = gql`
  query getAllAuthors {
    allAuthors {
      id
      lastname
      firstname
      books {
        id
        title
      }
    }
  }
`

export const GET_AUTHOR_LIST_WITHOUT_BOOKS = gql`
  query getAuthorsWithoutBooks($withoutBooks: Boolean = true) {
    allAuthors {
      id
      lastname
      firstname
      books @skip(if: $withoutBooks) {
        id
        title
      }
    }
  }
`

export const AUTHOR_FRAGMENT = gql`
  fragment MainAuthorInfo on Author {
    bio
    firstname
    lastname
  }
  # How to use Fragment:
  query remarkQuery {
    Remark: getAuthor(id: 2) {
      ...MainAuthorInfo
    }
  }
`

export const GET_AUTHOR_BY_DEFAULT = gql`
  query getAuthorByDefault($id: ID = 2) {
    getAuthor(id: $id) {
      bio
      firstname
      lastname
      books {
        id
        title
      }
    }
  }
`

export const ADD_AUTHOR_MUTATION = gql`
  mutation addNewAuthor($author: NewAuthorInput!) {
    addAuthor(author: $author) {
      id
      lastname
      firstname
      middlename
      bio
    }
  }
`
