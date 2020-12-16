import React, { FC } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { Button, Card, CardContent } from '@material-ui/core'
import { isNil } from 'lodash'
import { TableComponent } from 'components'
import ErrorComponent from 'components/Error'

import { AUTHOR_ADDED, GET_AUTHOR_LIST } from './graphql'
import { getAllAuthors } from './__generated__/getAllAuthors'
import AddAuthorForm from './AddAuthorForm'

const headerContent = ['First name', 'Last Name', 'Quantity Books', 'Link']

const NewAuthor: FC<{ onNewAuthor: () => void }> = ({ onNewAuthor }) => {
  const { data } = useSubscription<any>(AUTHOR_ADDED, {
    onSubscriptionData: () => {
      onNewAuthor()
    },
  })

  if (!data) return null

  return (
    <Card style={{ marginBottom: 20 }}>
      <CardContent>
        New author added: {data.authorAdded.firstname} {data.authorAdded.lastname}
      </CardContent>
    </Card>
  )
}

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
  if (error) return <ErrorComponent error={error} />
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
      <NewAuthor onNewAuthor={refetch} />

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
