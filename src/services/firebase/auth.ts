import { firebaseAuth } from 'services/firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const provider = new GoogleAuthProvider()

// SIGN UP / IN BY GOOGLE
export const signUser = () => signInWithPopup(firebaseAuth, provider)
    .then(() => {
        // Sign-in successful.
    }).catch((error) => {
        // An error happened.
    })

export const signUserOut = () => signOut(firebaseAuth)
    .then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    })