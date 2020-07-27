import React from 'react'
import { useQuery } from '@apollo/client'

import { TableComponent } from '../../components'
import authorNameString from '../../utils/authorNameString'

import { GET_ALL_BOOKS } from './graphql'
import { getAllBooks } from './__generated__/getAllBooks'

const headerContent = ['Book name', 'Author', 'Link']

const BooksContainer = () => {
  const { loading, error, data } = useQuery<getAllBooks>(GET_ALL_BOOKS)
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
    <div>
      <TableComponent headerContent={headerContent} title="Books list" rows={content} />
    </div>
  )
}
export default BooksContainer
