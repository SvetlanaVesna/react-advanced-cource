import React, { FC } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { createPortal } from 'react-dom'

const useStyles = makeStyles(() => ({
  modal: {
    display: 'none',
    position: 'fixed',
    zIndex: 1300,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  },
}))

const ModalPortalComponent: FC<{
  open: boolean
  handleClose: () => void
}> = ({ open, handleClose }) => {
  const classes = useStyles()
  const modalEl = document.getElementById('modal')
  const modalComponent = (
    <div
      id="myModal"
      className={classes.modal}
      style={{ display: open ? 'block' : 'none' }}
    >
      <div className={classes.modalContent}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  )
  if (modalEl) return createPortal(modalComponent, modalEl)
  return <Typography> no such dom noe</Typography>
}

export default ModalPortalComponent
