import React, { FC, useCallback, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/client'

import { BasicStyledComponent } from 'types'

import { LOGIN } from './graphql'
import styles from './styles'
import ErrorComponent from '../../components/Error'

const AuthComponent: FC<BasicStyledComponent> = ({ classes }) => {
  const [email, setEmail] = useState('')
  const [login, { data, error }] = useMutation(LOGIN)

  const onLogin = useCallback(async () => {
    await login({ variables: { email } })
    if (data) {
      const { login: token } = data
      localStorage.setItem('token', token)
      window.location.href = '/'
    }
  }, [email, data, login])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <TextField
          id="name"
          label="Name"
          onChange={e => setEmail(e.target.value.trim())}
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
        {error && <ErrorComponent error={error} />}
      </div>
    </div>
  )
}

export default withStyles(styles)(AuthComponent)
