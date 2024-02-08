import {
  GoogleAuthProvider,
  User as FbUser,
  signInWithCustomToken,
  signInWithPopup,
  updateEmail,
  updateProfile,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

import { CreateKakaoCustomTokenResponse } from '@/infrastructure/pnd/client/auth.client'
import { firebaseAuth } from './firebase-app'
import { userClient } from '@/infrastructure/pnd/client/user.client'
import {
  FirebaseProviderType,
  UserStatus,
} from '@/infrastructure/pnd/user.model'

export function useAuth() {
  const [user, setUser] = useState<FbUser | null>()
  const [status, setStatus] = useState<UserStatus>()
  const [providerType, setProviderType] = useState<FirebaseProviderType>()
  const isLogged = !!user

  const email = user?.email

  useEffect(() => {
    async function fetchUserStatus() {
      if (!email) {
        return
      }

      const result = await userClient.checkUserStatus({ email: email })

      setStatus(result.status)
      setProviderType(result.fbProviderType)
    }

    fetchUserStatus()
  }, [email])

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  function signOut() {
    firebaseAuth.signOut()
  }

  async function signInGoogle() {
    const provider = new GoogleAuthProvider()

    if (providerType && providerType !== 'google') {
      alert('이미 다른 방식으로 가입된 이메일입니다.')
      return
    }

    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        return {
          email: result.user?.email,
          displayName: result.user?.displayName,
          photoURL: result.user?.photoURL,
        }
      })
      .catch(console.error)
  }

  function signInKakao(authResult: CreateKakaoCustomTokenResponse) {
    if (providerType && providerType !== 'kakao') {
      alert('이미 다른 방식으로 가입된 이메일입니다.')
      return
    }

    signInWithCustomToken(firebaseAuth, authResult.authToken)
      .then(() => {
        if (authResult.email && firebaseAuth.currentUser) {
          updateEmail(firebaseAuth.currentUser, authResult.email)
          updateProfile(firebaseAuth.currentUser, {
            displayName: authResult.email.split('@')[0],
            photoURL: authResult.photoURL,
          })
        }
      })
      .catch(console.error)
  }

  return {
    user,
    isLogged,
    status,
    providerType,
    signOut,
    signInGoogle,
    signInKakao,
  }
}
