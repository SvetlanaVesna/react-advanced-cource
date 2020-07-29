import React from 'react'
import { useQuery } from '@apollo/client'

import { TableComponent } from '../../components'

import { GET_ALL_BOOKS } from './graphql'
import { getAllBooks } from './__generated__/getAllBooks'

const headerContent = ['Book name', 'Author', 'Link']

const BooksContainer = () => {
  const { loading, error, data } = useQuery<getAllBooks>(GET_ALL_BOOKS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const content = data
    ? data.allBooks.map(book => ({
        id: book.id,
        title: book.title,
        authors: `${book.author.firstname} ${book.author.lastname}`,
        link: `/books/${book.id}`,
      }))
    : []
  return (
    <div>
      <TableComponent headerContent={headerContent} title="Books list" rows={content} />
    </div>
  )
}
export default BooksContainer
