import {db} from './firebase'
import {dissoc, omit, forEachObjIndexed} from 'ramda'

export const createUser = (uid, username, email) => db.ref(`users/${uid}`).set({username, email})
export const getUser = (uid) => db.ref(`users/${uid}`).once('value')

const update = (obj, refFn) => forEachObjIndexed((key, value) => refFn(key).set(value), omit(['id'], obj))

const athleteRef = (uid, id, key) => id ? (
	key ? db.ref(`people/${uid}/athlete/${id}/${key}`) : db.ref(`people/${uid}/athlete/${id}`)
) : db.ref(`people/${uid}/athlete`)

export const createAthlete = (uid, athlete) => athleteRef(uid, athlete.id).set(dissoc("id", athlete))
export const updateAthlete = (uid, athlete) => update(athlete, (key) => athleteRef(uid, athlete.id, key))

export const getAthlete = (uid, id) => athleteRef(uid, id).once('value')
export const delAthlete = (uid, athlete) => athleteRef(uid, athlete).remove()
export const onAthletes = (uid, cb) => athleteRef(uid).on('value', cb)
export const offAthletes = (uid, cb) => athleteRef(uid).off('value', cb)
