import { gql } from '@apollo/client'

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

export const ADD_AUTHOR_MUTATION = gql`
  mutation addAuthor {
    addAuthor(
      author: {
        lastname: "Tolstoy"
        firstname: "Leo"
        middlename: "Nikolaevich"
        bio: "Tolstoy was born at Yasnaya Polyana, a family estate 12 kilometres (7.5 mi) southwest of Tula, Russia, and 200 kilometres (120 mi) south of Moscow."
      }
    ) {
      id
      lastname
      firstname
      middlename
      bio
    }
  }
`
