// @ts-nocheck
import React from 'react'
import { useQuery } from '@apollo/client'
import { Button } from '@material-ui/core'
import { isNil } from 'lodash'
import { TableComponent } from '../../components'

import { GET_AUTHOR_LIST } from './graphql'
import { getAllAuthors } from './__generated__/getAllAuthors'
import AddAuthorForm from './AddAuthorForm'

const headerContent = ['First name', 'Last Name', 'Quantity Books', 'Link']

const AuthorsContainer = () => {
  const { data, loading, error, refetch } = useQuery<getAllAuthors>(GET_AUTHOR_LIST)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const content = !isNil(data)
    ? data.allAuthors.map(({ firstname, lastname, books, id }) => ({
        id,
        firstname,
        lastname,
        count: books?.length,
        link: `/authors/${id}`,
      }))
    : []

  return (
    <div>
      <TableComponent
        headerContent={headerContent}
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>Author List</p>
            <div>
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Author
              </Button>
            </div>
          </div>
        }
        rows={content}
      />
      {open && (
        <AddAuthorForm open={open} handleClose={handleClose} onSuccess={refetch} />
      )}
    </div>
  )
}

export default AuthorsContainer
