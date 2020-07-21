import React, { FC } from 'react'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import moment from 'moment'
import image from '../../assets/images/photo.png'

const BookCardComponent: FC<{
  classes: any
  title: string
  description: string
  date: Date
}> = ({ classes, title, description, date }) => (
  <Card className={classes.card}>
    <CardActionArea>
      <div className={classes.imagesContainer}>
        <img className={classes.image} alt="/" src={image} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography component="p">{description}</Typography>
        <Typography component="p" className={classes.data}>
          Date: {moment(date).format('MM.DD.YYYY')}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default BookCardComponent
