import React, { FC, useCallback, useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/client'
import ErrorComponent from 'components/Error'
import { ADD_AUTHOR_MUTATION } from './graphql'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiInputBase-multiline': {
      width: '50ch',
    },
  },
}))

const AddAuthorForm: FC<{
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}> = ({ open, handleClose, onSuccess }) => {
  const classes = useStyles()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [middlename, setMiddlename] = useState('')
  const [bio, setBio] = useState('')

  const [addAuthor, { data, error, loading }] = useMutation(ADD_AUTHOR_MUTATION)

  const addAuthorCallback = useCallback(() => {
    addAuthor({
      variables: {
        author: {
          firstname,
          lastname,
          middlename,
          bio,
        },
      },
    })
  }, [firstname, lastname, middlename, bio, addAuthor])

  useEffect(() => {
    if (data) {
      onSuccess()
      handleClose()
    }
  })
  if (loading) return <CircularProgress />
  if (error) return <ErrorComponent error={error} />

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
    >
      <DialogTitle>Add Author</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          value={lastname}
          onChange={event => setLastname(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={firstname}
          onChange={event => setFirstname(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Middle Name"
          type="text"
          fullWidth
          value={middlename}
          onChange={event => setMiddlename(event.target.value)}
        />
        <TextField
          label="Bio"
          multiline
          rows={4}
          variant="outlined"
          value={bio}
          onChange={event => setBio(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={addAuthorCallback} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddAuthorForm
