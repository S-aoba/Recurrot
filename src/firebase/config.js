import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_APP_ID}`,
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
