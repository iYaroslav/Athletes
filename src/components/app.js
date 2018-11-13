import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import withAuthentication from './withAuthentication'
import {Layout} from 'antd'

import Navigation from './navigation'
import LandingPage from './landing'
import SignUpPage from './signUp'
import SignInPage from './signIn'
import PasswordForgetPage from './passwordForget'
import AccountPage from './account'

import * as routes from '../constants/routes'
import Athlet from "./athlet";

const {Header, Content, Footer} = Layout

const App = () => <Router>
  <Layout style={{flex: 1}}>
    <Header className="header">
      <Link to={"/"}><h4>Judoists</h4></Link>
      <div className="spacer"/>
      <Navigation/>
    </Header>
    <Content>
      <Layout>
        <Route
          exact path={routes.HOME}
          component={LandingPage}/>
        <Route
          exact path={routes.SIGN_UP}
          component={() => <SignUpPage/>}/>
        <Route
          exact path={routes.SIGN_IN}
          component={() => <SignInPage/>}/>
        <Route
          exact path={routes.PASSWORD_FORGET}
          component={() => <PasswordForgetPage/>}/>
        <Route
          exact path={routes.ACCOUNT}
          component={() => <AccountPage/>}/>
        <Route
          exact path={routes.ATHLET_ADD}
          component={() => <Athlet/>}/>
      </Layout>
    </Content>
    <Footer>Judoists ©2018 Created by LeeryBit LLC</Footer>
  </Layout>
</Router>

export default withAuthentication(App)
