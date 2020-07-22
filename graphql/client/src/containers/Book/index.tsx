import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { BookCardComponent } from '../../components'

import { GET_BOOK_BY_ID } from './graphql'

import styles from './styles'

class BookComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentPerPage: 5,
      pageNumber: 0,
    }
  }
  setNextPage() {
    console.log(this.props)
    const {
      book: { comments },
    } = this.props
    const { commentPerPage, pageNumber } = this.state
    if (pageNumber + commentPerPage <= comments.length)
      this.setState({ pageNumber: pageNumber + commentPerPage })
  }
  setPreviousPage() {
    const { commentPerPage, pageNumber } = this.state
    if (pageNumber - commentPerPage > 0)
      this.setState({ pageNumber: pageNumber - commentPerPage })
  }
  render() {
    const {
      classes,
      book: { description, comments, authors, title, pubDate, id },
    } = this.props

    const { commentPerPage, pageNumber } = this.state

    return (
      <Paper className={classes.root}>
        <div className={classes.container}>
          <BookCardComponent
            classes={classes}
            title={title}
            description={description}
            authors={authors}
            date={pubDate}
          />
          {comments.length !== 0 && (
            <Paper className={classes.comments}>
              <div className={classes.title}>Comments</div>
              <div className={classes.pagination}>
                <Button onClick={() => this.setPreviousPage()}>Prew</Button>
                <Button onClick={() => this.setNextPage()}>Next</Button>
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
}

const BookContainer = ({ classes, bookId }) => (
  <Query query={GET_BOOK_BY_ID} variables={{ id: bookId }}>
    {({ data: { Book }, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) return `Error!: ${error}`
      return <BookComponent book={Book} classes={classes} />
    }}
  </Query>
)

export default withStyles(styles)(BookContainer)
