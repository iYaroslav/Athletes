import React from 'react'
import { Link } from 'react-router-dom'
import AuthUserContext from './authUserContext'
import SignOutButton from './signOut'
import * as routes from '../constants/routes'
import { Menu, Icon } from 'antd'

const Navigation = () => <AuthUserContext.Consumer>
  {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
</AuthUserContext.Consumer>

const NavigationAuth = () => <Menu theme="dark" mode="horizontal" selectable={false}>
  <Menu.Item><Link to={routes.ACCOUNT}><Icon type="user" /></Link></Menu.Item>
  <Menu.Item><SignOutButton /></Menu.Item>
</Menu>

const NavigationNonAuth = () => <Menu theme="dark" mode="horizontal" selectable={false} />

export default Navigation
