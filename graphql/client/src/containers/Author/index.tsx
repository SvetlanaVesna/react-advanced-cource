import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'

import { GET_AUTHOR_BY_ID } from './graphql'

import AuthorComponent from './component'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  bio: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
  books: {
    padding: theme.spacing.unit * 4,
    margin: 'auto',
    marginTop: '20px',
  },
})

const Author = ({ classes, authorId }) => (
  <Query query={GET_AUTHOR_BY_ID} variables={{ id: authorId }}>
    {({ data: { Author }, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) return `Error!: ${error}`
      return <AuthorComponent author={Author} classes={classes} authorId={authorId} />
    }}
  </Query>
)
export default withStyles(styles)(Author)
