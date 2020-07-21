import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { TextField, Button } from '@material-ui/core'

import withStyles from '@material-ui/core/styles/withStyles'

import { LOGIN } from './graphql'

import styles from './styles'
import * as logoIcon from '../../assets/images/x5.png'

class AuthComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  async onClickLogin() {
    const { email, password } = this.state
    const { login } = this.props
    login({ variables: { email, password } }).then(
      ({
        data: {
          signinUser: { token },
        },
      }) => {
        localStorage.setItem('token', token)
        window.location.href = '/'
      },
    )
  }

  handleChange = (e, state) => this.setState({ [state]: e.target.value.trim() })

  render() {
    const {
      classes: { root, container, icon, logo, button },
    } = this.props
    return (
      <div className={root}>
        <div className={container}>
          <div className={icon}>
            <img className={logo} alt="/" src={logoIcon} />
          </div>
          <TextField
            id="name"
            label="Name"
            onChange={e => this.handleChange(e, 'email')}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={e => this.handleChange(e, 'password')}
          />
          <Button
            variant="outlined"
            color="secondary"
            className={button}
            onClick={() => this.onClickLogin()}
            onKeyUp={() => this.onClickLogin()}
          >
            Login
          </Button>
        </div>
      </div>
    )
  }
}
const Auth = ({ classes }) => (
  <Mutation mutation={LOGIN}>
    {login => <AuthComponent login={login} classes={classes} />}
  </Mutation>
)
export default withStyles(styles)(Auth)
