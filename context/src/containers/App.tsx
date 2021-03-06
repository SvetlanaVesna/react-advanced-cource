import React, { useContext, useState } from 'react'
import SayHelloProvider, { SayHelloContext } from './SayHelloProvider'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'

import ModalPortalComponent from './Portals'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const ThemeContext = React.createContext('light')

const SayHelloComponent = () => {
  const { sayHello, setName, name } = useContext(SayHelloContext)

  const classes = useStyles()
  return (
    <div>
      <Typography variant="h6">{sayHello()}</Typography>
      <div className={classes.root}>
        <TextField value={name} onChange={event => setName(event.target.value)} />
      </div>
    </div>
  )
}

const WishGoodDayComponent = () => {
  const { name } = useContext(SayHelloContext)

  const theme = useContext(ThemeContext)

  return (
    <div>
      {name && (
        <Typography color={theme === 'dark' ? 'primary' : 'secondary'}>
          Have a good day, {name}!
        </Typography>
      )}
      {!name && <Typography>Hope, you are ok!</Typography>}
    </div>
  )
}
const CurrentThemeNotice = () => {
  const theme = useContext(ThemeContext)
  return <Typography>Current theme is: {theme}</Typography>
}

const App = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ThemeContext.Provider value="dark">
      <SayHelloProvider>
        <SayHelloComponent />
        <WishGoodDayComponent />
        <CurrentThemeNotice />
        <div>
          <Typography variant="h6">Portal Example:</Typography>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open portal example dialog
          </Button>
          <ModalPortalComponent open={open} handleClose={handleClose}>
            <Typography>This component will render in div with id="modal"</Typography>
          </ModalPortalComponent>
        </div>
      </SayHelloProvider>
    </ThemeContext.Provider>
  )
}

export default App
