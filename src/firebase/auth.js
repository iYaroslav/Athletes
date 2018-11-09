import { auth } from './firebase'

export const signUp = (email, password) => auth.createUserWithEmailAndPassword(email, password)

export const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)

export const signOut = () => auth.signOut()

export const resetPassword = (email) => auth.sendPasswordResetEmail(email)

export const updatePassword = (password) => auth.currentUser.updatePassword(password)
