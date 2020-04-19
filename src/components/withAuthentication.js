import React from 'react'
import AuthUserContext from './authUserContext'
import { firebase } from '../firebase'

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: null,
      }
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => this.setState({ authUser }))
    }

    render() {
      const { authUser } = this.state

      return (<AuthUserContext.Provider value={authUser}>
        <Component />
      </AuthUserContext.Provider>)
    }
  }

export default withAuthentication
