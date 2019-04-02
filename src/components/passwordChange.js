import React, {Component} from 'react'
import {auth} from '../firebase'
import {message, Form, Spin, Input, Alert, Button, Icon} from "antd";
import {hasErrors} from "../utils/has-errors";

const FormItem = Form.Item;

const INITIAL_STATE = {
  loading: false,
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  componentDidMount() {
    this.props.form.validateFields()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  onSubmit = (event) => {

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true})
        auth.updatePassword(values.password)
          .then(() => {
            this.setState(INITIAL_STATE, () => message.success('Password has been changed'))
          })
          .catch(error => {
            this.setState({loading: false, error})
          })
      }
    })
    event.preventDefault()
  }

  render() {
    const {getFieldDecorator, getFieldError, getFieldsError, isFieldTouched} = this.props.form;
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');

    return (
      <Form className="password-change" onSubmit={this.onSubmit}>
        <Spin spinning={this.state.loading} size={'large'}>
          <FormItem
            help={passwordError || ''}
            validateStatus={passwordError ? 'error' : ''}
            label="New password">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                min: 6
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input
                size="large"
                type="password"
                placeholder="Enter new password"
                prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
              />
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
                prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
              />
            )}
          </FormItem>
          {this.state.error && <Alert
            className="password-change__alert"
            message="Ошибка"
            description={this.state.error.message}
            type="error"
          />}
          <Button
            type="primary"
            size="large"
            className="password-change__submit"
            disabled={hasErrors(getFieldsError())}
            htmlType="submit">
            Change password
          </Button>
        </Spin>
      </Form>)
  }
}

export default Form.create()(PasswordChangeForm)
