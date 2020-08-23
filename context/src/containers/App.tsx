import React, { useContext } from 'react'
import SayHelloProvider, { SayHelloContext } from './SayHelloProvider'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const ThemeContext = React.createContext('')

const SayHelloComponent = () => {
  const { sayHello, setName, name } = useContext(SayHelloContext)
  const classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
        <TextField value={name} onChange={event => setName(event.target.value)} />
      </div>
      <Typography variant="h5">{sayHello()}</Typography>
    </div>
  )
}

const WishGoodDayComponent = () => {
  const { name } = useContext(SayHelloContext)

  return (
    <div>
      {name && <Typography>Have a good day, {name}!</Typography>}
      {!name && <Typography>Hope, you are ok!</Typography>}
    </div>
  )
}
const CurrentThemeNotice = () => {
  const theme = useContext(ThemeContext)
  return <Typography>Current theme is: {theme}</Typography>
}

const App = () => {
  return (
    <ThemeContext.Provider value="dark">
      <SayHelloProvider>
        <SayHelloComponent />
        <WishGoodDayComponent />
        <CurrentThemeNotice />
      </SayHelloProvider>
    </ThemeContext.Provider>
  )
}

export default App
