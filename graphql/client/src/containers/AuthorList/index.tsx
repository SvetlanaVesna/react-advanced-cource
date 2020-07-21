import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { TableComponent } from '../../components'

import { GET_AUTHOR_LIST } from './graphql'

const headerContent = ['First name', 'Last Name', 'Quantity Books', 'Link']

class AuthorsContainer extends Component {
  render() {
    return (
      <div>
        <Query query={GET_AUTHOR_LIST}>
          {({ loading, error, data: { allAuthors } }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>
            const content =
              allAuthors &&
              allAuthors.map(({ firstname, lastname, books, id }) => ({
                id,
                firstname,
                lastname,
                count: books.length,
                link: `/authors/${id}`,
              }))
            return (
              <TableComponent
                headerContent={headerContent}
                title="Authors list"
                rows={content}
              />
            )
          }}
        </Query>
      </div>
    )
  }
}

export default AuthorsContainer
