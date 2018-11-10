import React from 'react'
import {Form, Icon, Input, Button, Alert, Spin} from 'antd';
import './style.css'
import Auth from '../../api-actions/auth';

const FormItem = Form.Item;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: undefined, loading: false}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true});
        Auth.signIn(values)
          .then(user => {
            this.setState({loading: false}, () => this.props.signIn(user))
          })
          .catch(error => {
            console.log(error);
            this.setState({error: true, loading: false})
          })
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (

      <Form onSubmit={this.handleSubmit} className="login-form">
        <Spin spinning={this.state.loading} size={'large'}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input size="large" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input size="large" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="Password"/>
            )}
          </FormItem>
          {this.state.error && <Alert
            message="Ошибка"
            description={this.state.error}
            type="error"
          />}

          <Button type="primary" size="large" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Spin>
      </Form>

    );
  }
}

export default Form.create()(LoginPage);
