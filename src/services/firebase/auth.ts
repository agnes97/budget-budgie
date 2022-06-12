import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { DocumentReference } from 'firebase/firestore'
import { setDoc, doc, getDoc } from 'firebase/firestore'

import { cloneBudget } from 'services/budget'
import { firebaseAuth, profilesCollection } from 'services/firebase'

import type { ProfileDocument } from './types'

const provider = new GoogleAuthProvider()

export const getProfile = async (
  userId: string
): Promise<ProfileDocument | null> => {
  const profileDocumentReference = doc(profilesCollection, userId)
  const profileDocumentSnapshot = await getDoc(profileDocumentReference)

  if (!profileDocumentSnapshot.exists()) {
    return null
  }

  return profileDocumentSnapshot.data()
}

export const createNewProfile = async (
  userId: string,
  activeBudgetReference: DocumentReference
): Promise<ProfileDocument> => {
  const profileDocumentReference = doc(profilesCollection, userId)

  const newProfile: ProfileDocument = {
    'active-budget': activeBudgetReference,
    budgets: [activeBudgetReference],
  }

  await setDoc(profileDocumentReference, newProfile)

  return newProfile
}

// void createNewProfile('gYE3GEqbfAbpxJHMgyk7UejaGpH2', 'My first budget')

// SIGN UP / IN BY GOOGLE
export const signUser = async (): Promise<ProfileDocument> => {
  const { user } = await signInWithPopup(firebaseAuth, provider)
  // Sign-in successful.
  // If user has no budgets, create first one.
  const userId = user.uid
  const profile = await getProfile(userId)

  if (profile) {
    return profile
  }

  const clonnedBudgetReference = await cloneBudget('showcase')
  return await createNewProfile(userId, clonnedBudgetReference)
}

export const signUserOut = async () =>
  void (await signOut(firebaseAuth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.error(error)
    }))
