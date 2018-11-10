import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import byPropKey from '../utils/byPropKey'
import {auth} from '../firebase'
import * as routes from '../constants/routes'
import {SignUpLink} from "./signUp"

const PasswordForgetPage = () =>
	<div>
		<h1>PasswordForget</h1>
		<PasswordForgetForm />
		<SignUpLink />
	</div>

const INITIAL_STATE = {
	email: '',
	error: null,
}

class PasswordForgetForm extends Component {
	constructor(props) {
		super(props)

		this.state = {...INITIAL_STATE}
	}

	onSubmit = (event) => {
		const {email} = this.state

		auth.resetPassword(email)
			.then(() => {
				this.setState({...INITIAL_STATE});
			})
			.catch(error => {
				this.setState(byPropKey('error', error));
			})

		event.preventDefault()
	}

	render() {
		const {email, error} = this.state

		const isInvalid = email === ''

		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={this.state.email}
					onChange={event => this.setState(byPropKey('email', event.target.value))}
					type="text"
					placeholder="Email Address"
				/>
				<button disabled={isInvalid} type="submit">
					Reset My Password
				</button>

				{error && <p>{error.message}</p>}
			</form>
		)
	}
}

const PasswordForgetLink = ({className}) => <p className={className}>
	<Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
</p>

export default PasswordForgetPage

export {
	PasswordForgetForm,
	PasswordForgetLink,
}
