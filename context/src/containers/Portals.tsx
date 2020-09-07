import React, { FC } from 'react'
import { Dialog, DialogContent, Typography } from '@material-ui/core'
import { createPortal } from 'react-dom'

const ModalPortalComponent: FC<{
  open: boolean
  handleClose: () => void
}> = ({ open, handleClose }) => {
  const modalEl = document.getElementById('modal')
  const modalComponent = (
    <div data-testid="new_modal_dialog">
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>This dialog mount into div with id="modal"</DialogContent>
      </Dialog>
    </div>
  )
  if (modalEl) return createPortal(modalComponent, modalEl)
  return <Typography> no such dom noe</Typography>
}

export default ModalPortalComponent
