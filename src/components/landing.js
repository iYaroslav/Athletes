import React from 'react'
import AuthUserContext from "./authUserContext"
import HomePage from "./home"
import {Redirect} from "react-router-dom"
import {SIGN_IN} from "../constants/routes"

const LandingPage = () => <AuthUserContext.Consumer>
	{authUser => authUser ? <HomePage /> : <Redirect to={SIGN_IN} />}
</AuthUserContext.Consumer>

export default LandingPage
