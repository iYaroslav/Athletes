import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {Alert, Button, Form, Icon, Input, Spin} from "antd";

import {SignUpLink} from './signUp'
import {PasswordForgetLink} from './passwordForget'
import {auth} from '../firebase'
import * as routes from '../constants/routes'
import AuthUserContext from "./authUserContext"

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const SignInPage = ({history}) =>
  <div className='signin'>
    <AuthUserContext.Consumer>
      {authUser => {
        if (authUser) {
          return <Redirect to={routes.HOME}/>
        } else {
          return null
        }
      }}
    </AuthUserContext.Consumer>
    <h1>SignIn</h1>
    <SignInForm history={history}/>
    <PasswordForgetLink className="signin__forget"/>
    <SignUpLink/>
  </div>


class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: false}
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  onSubmit = (event) => {
    const {history} = this.props

    this.props.form.validateFields((err, values) => {
      const {email, password} = values
      if (!err) {
        this.setState({loading: true})
        auth.signIn(email, password)
          .then(() => {
            this.setState({error: null, loading: false},
              () => history.push(routes.HOME))
          })
          .catch(error => {
            this.setState({error, loading: false})
          })
      }
    })

    event.preventDefault()
  }

  render() {
    const {getFieldDecorator, getFieldError, getFieldsError, isFieldTouched} = this.props.form;
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form onSubmit={this.onSubmit} className="signin__form">
        <Spin spinning={this.state.loading} size={'large'}>
          <FormItem
            help={emailError || ''}
            validateStatus={emailError ? 'error' : ''}>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Please input your email!'}],
            })(
              <Input
                size="large"
                type="email"
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Email"/>
            )}
          </FormItem>

          <FormItem
            help={passwordError || ''}
            validateStatus={passwordError ? 'error' : ''}>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="Password"/>
            )}
          </FormItem>

          {this.state.error && <Alert
            className="signin__alert"
            message="Ошибка"
            description={this.state.error.message}
            type="error"
          />}

          <Button
            type="primary"
            size="large"
            className="signin__submit"
            disabled={hasErrors(getFieldsError())}
            htmlType="submit">
            Sign in
          </Button>
        </Spin>
      </Form>
    );
  }
}

const SignInForm = Form.create()(SignIn)

export default withRouter(SignInPage)

export {
  SignInForm,
}
