import React, { FC } from 'react'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { withStyles } from '@material-ui/core/styles'
import { BasicStyledComponent } from '../../types'

const actionsStyles = (theme: any) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
})
const TablePaginationActions: FC<{
  onChangePage: any
  onChangeRowsPerPage?: any
  page: number
  rowsPerPage: number
  count: number
  theme: any
} & BasicStyledComponent> = ({
  page,
  onChangePage,
  classes,
  count,
  rowsPerPage,
  theme,
}) => {
  return (
    <div className={classes.root}>
      <IconButton
        onClick={event => onChangePage(event, page - 1)}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={event => onChangePage(event, page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </div>
  )
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true,
})(TablePaginationActions)

export default TablePaginationActionsWrapped
