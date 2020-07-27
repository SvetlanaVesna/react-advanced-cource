import React, { FC, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/client'

import { BasicStyledComponent } from 'types'

import { LOGIN } from './graphql'
import styles from './styles'

const AuthComponent: FC<BasicStyledComponent> = ({ classes }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data }] = useMutation(LOGIN)

  const onLogin = async () => {
    login({ variables: { email, password } })
    if (data) {
      const {
        signinUser: { token },
      } = data
      localStorage.setItem('token', token)
      window.location.href = '/'
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <TextField
          id="name"
          label="Name"
          onChange={e => setEmail(e.target.value.trim())}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value.trim())}
        />
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={onLogin}
          onKeyUp={onLogin}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(AuthComponent)
