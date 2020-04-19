import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Alert, Button, Form, Icon, Input, Spin } from 'antd'

import { auth, db } from '../firebase'
import * as routes from '../constants/routes'
import { hasErrors } from '../utils/has-errors'

const FormItem = Form.Item

const SignUpPage = ({ history }) =>
  <div className="signup">
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, error: null }
  }

  componentDidMount() {
    this.props.form.validateFields()
  }

  onSubmit = (event) => {
    const { history } = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, email, password } = values
        this.setState({ loading: true })
        auth.signUp(email, password)
          .then(authUser => db.createUser(authUser.user.uid, username, email))
          .then(() => {
            history.push(routes.HOME)
          })
          .catch(error => {
            this.setState({ error, loading: false })
          })
      }
    })

    event.preventDefault()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    const emailError = isFieldTouched('email') && getFieldError('email')
    const passwordError = isFieldTouched('password') && getFieldError('password')
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm')
    const usernameError = isFieldTouched('username') && getFieldError('username')
    return (
      <Form className="signup__form" onSubmit={this.onSubmit}>
        <Spin spinning={this.state.loading} size={'large'}>
          <FormItem
            help={usernameError || ''}
            validateStatus={usernameError ? 'error' : ''}
            label="Username">
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: 'Please input your username!',
              }],
            })(
              <Input
                size="large"
                placeholder="Enter username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />,
            )}
          </FormItem>
          <FormItem
            help={emailError || ''}
            validateStatus={emailError ? 'error' : ''}
            label="Email">
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: 'Please input your email!',
              }, {
                type: 'email', message: 'Email wrong format',
              }],
            })(
              <Input
                size="large"
                placeholder="Enter email"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />,
            )}
          </FormItem>
          <FormItem
            help={passwordError || ''}
            validateStatus={passwordError ? 'error' : ''}
            label="Password">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                min: 6,
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input
                size="large"
                type="password"
                placeholder="Enter password"
                prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />,
            )}
          </FormItem>
          <FormItem
            help={confirmError || ''}
            validateStatus={confirmError ? 'error' : ''}
            label="Confirm password">
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input
                size="large"
                type="password"
                placeholder="Confirm password"
                prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />,
            )}
          </FormItem>
          {this.state.error && <Alert
            className="signup__alert"
            message="Ошибка"
            description={this.state.error.message}
            type="error"
          />}
          <Button
            type="primary"
            size="large"
            className="signup__submit"
            disabled={hasErrors(getFieldsError())}
            htmlType="submit">
            Sign up
          </Button>
        </Spin>
      </Form>)
  }
}

const SignUpLink = ({ className }) => <p className={className}>
  Don't have an account?
  {' '}
  <Link to={routes.SIGN_UP}>Sign Up</Link>
</p>

const SignUpForm = Form.create()(SignUp)

export default withRouter(SignUpPage)

export {
  SignUpForm,
  SignUpLink,
}
