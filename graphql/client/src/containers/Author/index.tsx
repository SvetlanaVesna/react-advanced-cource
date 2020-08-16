import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper/Paper'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { isNil } from 'lodash'

import { GET_AUTHOR_BY_ID } from './graphql'

import { BasicStyledComponent } from 'types'
import { getAuthor } from './__generated__/getAuthor'

import { TableComponent } from '../../components'
import ErrorComponent from '../../components/Error'

const styles = (theme: any) => ({
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

const Author: FC<{ authorId: number } & BasicStyledComponent> = ({
  classes,
  authorId,
}) => {
  const { data, error, loading } = useQuery<getAuthor>(GET_AUTHOR_BY_ID, {
    variables: { id: authorId },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <ErrorComponent error={error} />
  const author = data?.getAuthor
  return (
    <div className={classes.root}>
      <Paper className={classes.bio}>
        <Grid container>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {author?.lastname} {author?.firstname}
                </Typography>
                <Typography gutterBottom>{author?.bio}</Typography>
              </Grid>
              <Grid item>
                <NavLink to="/">
                  <Typography style={{ cursor: 'pointer' }}>Back</Typography>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.books}>
        {!isNil(author) && !isNil(author.books) && (
          <TableComponent
            headerContent={['Publication Date', 'Title']}
            title="Author books list"
            rows={author.books.map(({ pubDate, title, id }) => ({
              pubDate: moment(pubDate).format('MM.DD.YYYY'),
              title,
              id,
            }))}
          />
        )}
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Author)
