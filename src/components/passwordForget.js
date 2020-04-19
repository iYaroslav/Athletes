import React, { Component } from 'react'
import { Alert, Button, Form, Icon, Input, Spin } from 'antd'
import { Link } from 'react-router-dom'
import byPropKey from '../utils/byPropKey'
import { auth } from '../firebase'
import * as routes from '../constants/routes'
import { SignUpLink } from './signUp'

const FormItem = Form.Item

const PasswordForgetPage = () =>
  <div className="forget">
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
    <SignUpLink />
  </div>

const INITIAL_STATE = {
  email: '',
  error: null,
  loading: false,
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  onSubmit = (event) => {
    const { email } = this.state
    this.setState({ loading: true })
    auth.resetPassword(email)
      .then(() => {
        this.setState(INITIAL_STATE)
      })
      .catch(error => {
        this.setState({ error, loading: false })
      })

    event.preventDefault()
  }

  render() {
    const { email, error, loading } = this.state

    const isInvalid = email === ''

    return (
      <Form className="forget__form" onSubmit={this.onSubmit}>
        <Spin spinning={loading} size="large">
          <FormItem>
            <Input
              value={this.state.email}
              type="email"
              size="large"
              placeholder="Email Address"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
            />
          </FormItem>
          {error && <Alert
            className="forget__alert"
            message="Ошибка"
            description={error.message}
            type="error"
          />}
          <Button
            className="forget__submit"
            type="primary"
            size="large"
            disabled={isInvalid}
            htmlType="submit">
            Reset My Password
          </Button>
        </Spin>
      </Form>

    )
  }
}

const PasswordForgetLink = ({ className }) => <p className={className}>
  <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
</p>

export default PasswordForgetPage

export {
  PasswordForgetForm,
  PasswordForgetLink,
}
