import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { BookCardComponent } from '../../components'

import { GET_BOOK_BY_ID } from './graphql'

import styles from './styles'
import { getBook } from './__generated__/getBook'
import { BasicStyledComponent } from '../../types'

const BookComponent = ({
  bookId,
  classes,
}: { bookId: number } & BasicStyledComponent) => {
  const [commentPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)
  const { data, loading, error } = useQuery<getBook>(GET_BOOK_BY_ID, {
    variables: { id: bookId },
  })

  if (loading) return <p>Loading...</p>
  if (error) return `Error!: ${error}`

  const setNextPage = () => {
    const comments = data?.getBook?.comments ?? []
    if (comments?.length && pageNumber + commentPerPage <= comments?.length)
      setPageNumber(pageNumber + commentPerPage)
  }
  const setPreviousPage = () => {
    if (pageNumber - commentPerPage > 0) setPageNumber(pageNumber - commentPerPage)
  }
  const book = data?.getBook
  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <BookCardComponent
          classes={classes}
          title={book?.title ?? ''}
          description={book?.description ?? ''}
          authors={book?.authors}
          date={book?.pubDate ?? ''}
        />
        {book?.comments?.length !== 0 && (
          <Paper className={classes.comments}>
            <div className={classes.title}>Comments</div>
            <div className={classes.pagination}>
              <Button onClick={setPreviousPage}>Prew</Button>
              <Button onClick={setNextPage}>Next</Button>
            </div>
          </Paper>
        )}
      </div>
      <Button
        variant="contained"
        className={classes.button}
        component={Link}
        to="/books"
        color="secondary"
      >
        Back
      </Button>
    </Paper>
  )
}
// @ts-ignore
export default withStyles(styles)(BookComponent)
