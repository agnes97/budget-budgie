import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getFirestore } from 'firebase/firestore'
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const analytics = getAnalytics(firebaseApp)

export const firebaseAuth = getAuth(firebaseApp)

export const firestore = getFirestore(firebaseApp)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createCollection = <TDocumentType = DocumentData>(
  collectionName: string,
) =>
  collection(firestore, collectionName) as CollectionReference<TDocumentType>
