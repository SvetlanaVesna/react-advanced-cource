import React from 'react'
import { Query } from 'react-apollo'

import { TableComponent } from '../../components'
import authorNameString from '../../utils/authorNameString'

import { GET_ALL_BOOKS } from './graphql'

const headerContent = ['Book name', 'Author', 'Link']

const BooksContainer = () => (
  <div>
    <Query query={GET_ALL_BOOKS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>
        const content =
          data &&
          data.allBooks.map(item => ({
            id: item.id,
            title: item.title,
            authors: authorNameString(item.authors),
            link: `/books/${item.id}`,
          }))
        return (
          <TableComponent
            headerContent={headerContent}
            title="Books list"
            rows={content}
          />
        )
      }}
    </Query>
  </div>
)

export default BooksContainer
