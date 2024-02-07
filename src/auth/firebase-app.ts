import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { FIREBASE_CONFIG } from '@/config'

export const firebaseApp = initializeApp(FIREBASE_CONFIG)
export const firebaseAuth = getAuth(firebaseApp)
