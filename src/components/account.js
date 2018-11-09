import React, {Component} from 'react'
import AuthUserContext from './authUserContext'
import {PasswordForgetForm} from './passwordForget'
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
			this.setState({usersInfo: snapshot.val()}))
	}

	render() {
		const {usersInfo} = this.state

		return (<AuthUserContext.Consumer>
				{authUser =>
					<div>
						{!!usersInfo && <h1>Fullname: {usersInfo.username}</h1>}
						<h1>Account: {authUser.email}</h1>

						<PasswordForgetForm />
						<PasswordChangeForm />
					</div>
				}
			</AuthUserContext.Consumer>
		)
	}
}

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(AccountPage)
