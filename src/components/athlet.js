import React from 'react'
import AuthUserContext from "./authUserContext"
import AthletPage from "./athlet-page"
import {Redirect} from "react-router-dom"
import {SIGN_IN} from "../constants/routes"

const Athlet = () => <AuthUserContext.Consumer>
	{authUser => authUser ? <AthletPage /> : <Redirect to={SIGN_IN} />}
</AuthUserContext.Consumer>

export default Athlet
