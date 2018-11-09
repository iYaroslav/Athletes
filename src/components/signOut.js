import React from 'react'
import {auth} from '../firebase'
import {Icon} from "antd";

const SignOutButton = () => <a href={'#!/logout'} onClick={auth.signOut}>
	<Icon type="logout" />
</a>

export default SignOutButton
