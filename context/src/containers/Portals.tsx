import React, { FC, useState } from 'react'
import { Button, Dialog, DialogContent, Typography } from '@material-ui/core'
import { createPortal } from 'react-dom'

const ModalPortalComponent: FC = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const modalEl = document.getElementById('modal')
  const modalComponent = (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open portal example dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>This dialog mount into div with id="modal"</DialogContent>
      </Dialog>
    </div>
  )
  if (modalEl) return createPortal(modalComponent, modalEl)
  return <Typography> no such dom noe</Typography>
}

export default ModalPortalComponent
