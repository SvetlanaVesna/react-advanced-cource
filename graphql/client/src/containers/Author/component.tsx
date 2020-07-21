import React from 'react'
import moment from 'moment'

import Paper from '@material-ui/core/Paper/Paper'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import { NavLink } from 'react-router-dom'
import { TableComponent } from '../../components'

const AuthorComponent = ({ classes, author }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.bio}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {author.lastname} {author.firstname}
                </Typography>
                <Typography gutterBottom>{author.bio}</Typography>
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
        <TableComponent
          headerContent={['Publication Date', 'Title']}
          title="Author books list"
          rows={author.books.map(({ pubDate, title }) => ({
            pubDate: moment(pubDate).format('MM.DD.YYYY'),
            title,
          }))}
        />
      </Paper>
    </div>
  )
}

export default AuthorComponent
