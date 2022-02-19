/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

import { firebaseAuth } from 'services/firebase'

const provider = new GoogleAuthProvider()

// SIGN UP / IN BY GOOGLE
export const signUser = async () => await signInWithPopup(firebaseAuth, provider)
  .then(() => {
    // Sign-in successful.
  }).catch(error => {
    // An error happened.
  })

export const signUserOut = async () => await signOut(firebaseAuth)
  .then(() => {
    // Sign-out successful.
  }).catch(error => {
    // An error happened.
  })
