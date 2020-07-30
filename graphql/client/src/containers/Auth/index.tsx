import React, { FC, useCallback, useEffect, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/client'
import { set } from 'js-cookie'

import { BasicStyledComponent } from 'types'

import { LOGIN } from './graphql'
import styles from './styles'
import ErrorComponent from '../../components/Error'

const AuthComponent: FC<BasicStyledComponent> = ({ classes }) => {
  const [email, setEmail] = useState('')
  const [login, { data, error }] = useMutation(LOGIN)

  const onLogin = useCallback(async () => {
    await login({ variables: { email } })
  }, [email, login])

  useEffect(() => {
    if (data) {
      const { login: token } = data
      set('token', token)
      window.location.href = '/'
    }
  }, [data])

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
