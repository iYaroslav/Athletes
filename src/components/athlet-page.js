import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Alert, Button, Form, Icon, Input, Radio, Spin } from 'antd'
import uuid from 'uuid/v4'
import { filter, identity } from 'ramda'

import * as routes from '../constants/routes'
import AuthUserContext from './authUserContext'
import { hasErrors } from '../utils/has-errors'
import withAuthorization from './withAuthorization'
import { db } from '../firebase'
import Avatar from './avatar'
import { HOME } from '../constants/routes'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const AthletPage = ({ history, authUser }) =>
  <div className='athlet'>
    <AuthUserContext.Consumer>
      {authUser => {
        if (!authUser) {
          return <Redirect to={routes.HOME} />
        } else {
          return null
        }
      }}
    </AuthUserContext.Consumer>
    <h1>Add athlet</h1>
    <AthletForm
      userId={authUser.uid}
      history={history} />
  </div>

const AthletForm = Form.create()(class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      athletId: props.athlet ? props.athlet.id : uuid(),
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { history } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = filter(identity, values)
        this.setState({ loading: true })
        db.createAthlete(this.props.userId, {
          ...values,
          photo: this.state.link || '',
          id: this.state.athletId,
        })
          .then(() => {
            history.push(HOME)
          })
          .catch((error) => {
            this.setState({ error, loading: false })
          })
      }
    })

  }

  render() {
    const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    const emailError = isFieldTouched('email') && getFieldError('email')
    const nationalityError = isFieldTouched('nationality') && getFieldError('nationality')
    const nameError = isFieldTouched('name') && getFieldError('name')
    const birthdayError = isFieldTouched('birthday') && getFieldError('birthday')
    const genderError = isFieldTouched('gender') && getFieldError('gender')

    return (
      <div className="athlet__wrapper">
        <Avatar
          filename={this.state.athletId}
          imageUrl={this.state.link}
          size='large'
          onSuccess={link => this.setState({ link }, () => console.log(link))} />
        <Form onSubmit={this.onSubmit.bind(this)} className="athlet__form">
          <Spin spinning={this.state.loading} size={'large'}>
            <FormItem
              label="Email"
              help={emailError || ''}
              validateStatus={emailError ? 'error' : ''}>
              {getFieldDecorator('email', {
                rules: [{ type: 'email' }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email" />,
              )}
            </FormItem>

            <FormItem
              label="Nationality"
              help={nationalityError || ''}
              validateStatus={nationalityError ? 'error' : ''}>
              {getFieldDecorator('nationality')(
                <Input
                  size="large"
                  prefix={<Icon type="flag" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Nationality" />,
              )}
            </FormItem>

            <FormItem
              label="Name"
              help={nameError || ''}
              validateStatus={nameError ? 'error' : ''}>
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name" />,
              )}
            </FormItem>

            <FormItem
              label="Birthday"
              help={birthdayError || ''}
              validateStatus={birthdayError ? 'error' : ''}>
              {getFieldDecorator('birthday', {
                rules: [{ required: true }],
              })(
                <Input
                  size="large"
                  type="number"
                  prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name" />,
              )}
            </FormItem>

            <FormItem label="Passport">
              {getFieldDecorator('passport')(
                <Input
                  size="large"
                  prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Last name" />,
              )}
            </FormItem>

            <FormItem label="City">
              {getFieldDecorator('city')(
                <Input
                  size="large"
                  prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Last name" />,
              )}
            </FormItem>

            <FormItem
              label="Gender"
              help={genderError || ''}
              validateStatus={genderError ? 'error' : ''}>
              {getFieldDecorator('gender', {
                rules: [{ required: true }],
              })(
                <RadioGroup>
                  <Radio value={1}>Mail</Radio>
                  <Radio value={2}>Female</Radio>
                </RadioGroup>,
              )}
            </FormItem>

            {this.state.error && <Alert
              className="athlet__alert"
              message="Ошибка"
              description={this.state.error.message}
              type="error"
            />}

            <Button
              type="primary"
              size="large"
              className="athlet__submit"
              disabled={hasErrors(getFieldsError())}
              htmlType="submit">
              Add
            </Button>
          </Spin>
        </Form>
      </div>
    )
  }
})

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(AthletPage)
