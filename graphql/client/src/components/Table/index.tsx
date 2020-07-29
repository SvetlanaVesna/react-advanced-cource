import React, { useMemo, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import OpenNew from '@material-ui/icons/OpenInNew'
import { Link } from 'react-router-dom'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActionsWrapped from './TablePaginationActions'
import { BasicStyledComponent } from '../../types'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    'overflow-x': 'auto',
  },
  table: {
    minWidth: 700,
  },
})

const defaultRows = [{ id: 1 }]
const TableComponent = <T extends { id: number | string }>(
  props: {
    rows: T[]
    headerContent: any[]
    title: string
  } & BasicStyledComponent,
) => {
  const rows = useMemo(() => props.rows || defaultRows, [props.rows])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { classes, headerContent = [1, 2, 3], title = 'Title' } = props

  return (
    <div>
      <div>{title}</div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headerContent.map(item => (
                <TableCell key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row.id}>
                {Object.keys(row).map(item => {
                  if (item !== 'id')
                    return (
                      <TableCell key={item}>
                        {item === 'link' ? (
                          <Link to={row[item]}>
                            <OpenNew />
                          </Link>
                        ) : (
                          row[item]
                        )}
                      </TableCell>
                    )
                  return null
                })}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 3, 5]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(_, newPage) => setPage(newPage)}
                onChangeRowsPerPage={event => setRowsPerPage(Number(event.target.value))}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(TableComponent)
