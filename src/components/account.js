import React, { Component } from 'react'
import PasswordChangeForm from './passwordChange'
import withAuthorization from './withAuthorization'
import * as db from '../firebase/db'

class AccountPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: null,
    }
  }

  componentDidMount() {
    db.getUser(this.props.authUser.uid).then(snapshot =>
      this.setState({ usersInfo: snapshot.val() }))
  }

  render() {
    const { usersInfo } = this.state
    const { authUser } = this.props

    return (
      <div className='account'>
        {!!usersInfo && <h3>Fullname: {usersInfo.username}</h3>}
        <h3>Account: {authUser.email}</h3>
        <PasswordChangeForm />
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(AccountPage)
