import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { DocumentReference } from 'firebase/firestore'
import { setDoc, doc, getDoc } from 'firebase/firestore'

import { cloneBudget, updateBudgetInfo } from 'services/budget'
import { firebaseAuth, profilesCollection } from 'services/firebase'

import type { BudgetDocument, ProfileDocument } from './types'

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
  activeBudgetReference: DocumentReference<BudgetDocument>
): Promise<ProfileDocument> => {
  const profileDocumentReference = doc(profilesCollection, userId)

  const newProfile: ProfileDocument = {
    'active-budget': activeBudgetReference,
    budgets: [activeBudgetReference],
  }

  await updateBudgetInfo('title', activeBudgetReference.id, 'My first budget')

  await updateBudgetInfo(
    'description',
    activeBudgetReference.id,
    "This is your personal copy of our showcase budget. :) You're free to edit it however you like or create your own budget from scratch in the menu on top right side of the page."
  )

  await setDoc(profileDocumentReference, newProfile)

  return newProfile
}

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
