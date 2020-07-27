import React from 'react'
import { useQuery } from '@apollo/client'

import { TableComponent } from '../../components'

import { GET_AUTHOR_LIST } from './graphql'
import { getAllAuthors } from './__generated__/getAllAuthors'

const headerContent = ['First name', 'Last Name', 'Quantity Books', 'Link']

const AuthorsContainer = () => {
  const { data, loading, error } = useQuery<getAllAuthors>(GET_AUTHOR_LIST)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const content =
    data?.allAuthors &&
    data?.allAuthors.map(({ firstname, lastname, books, id }) => ({
      id,
      firstname,
      lastname,
      count: books?.length,
      link: `/authors/${id}`,
    }))

  return (
    <TableComponent headerContent={headerContent} title="Authors list" rows={content} />
  )
}

export default AuthorsContainer
