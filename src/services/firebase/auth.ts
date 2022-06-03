import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { createNewBudget, getBudgetIdsByUserId } from 'services/budget'
import type { BudgetDocument, ProfileDocument } from 'services/budget/types'
import { createCollection, firebaseAuth } from 'services/firebase'

const provider = new GoogleAuthProvider()

export const createNewProfile = async (
  userId: string,
  newActiveBudgetId: string
): Promise<void> => {
  const budgetsCollection = createCollection<BudgetDocument>('budgets')
  const profilesCollection = createCollection<ProfileDocument>('profiles')
  const newProfileId = userId

  const newActiveBudgetReference = doc(budgetsCollection, newActiveBudgetId)

  await setDoc(doc(profilesCollection, newProfileId), {
    'active-budget': newActiveBudgetReference,
    budgets: [],
  })
}

// void createNewProfile('gYE3GEqbfAbpxJHMgyk7UejaGpH2', 'My first budget')

// SIGN UP / IN BY GOOGLE
export const signUser = async (): Promise<void> =>
  void (await signInWithPopup(firebaseAuth, provider)
    .then(async (result) => {
      // Sign-in successful.
      // If user has no budgets, create first one.
      const userId = result.user.uid
      const doesUserHaveBudgets: Promise<string[]> =
        getBudgetIdsByUserId(userId)
      if ((await doesUserHaveBudgets).length === 0) {
        void createNewProfile(userId, 'My first budget')
        void createNewBudget(userId, 'My first budget')
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    }))

export const signUserOut = async () =>
  void (await signOut(firebaseAuth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    }))
