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
  const [accessToken, setAccessToken] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)
  const isLoggedIn = !!user

  const email = user?.email

  useEffect(() => {
    async function fetchUserStatus() {
      if (!email) {
        setIsLoading(false)
        return
      }

      const result = await userClient.checkUserStatus({ email: email })

      setStatus(result.status)
      setProviderType(result.fbProviderType)
      setIsLoading(false)
    }

    fetchUserStatus()
  }, [email])

  useEffect(() => {
    const unsubscribeAuthStateListener = firebaseAuth.onAuthStateChanged(
      (user) => {
        setUser(user)
      },
    )

    const unsubscribeIdTokenListener = firebaseAuth.onIdTokenChanged(
      async (user) => {
        if (user) {
          const token = await user.getIdToken()
          setAccessToken(token)
        }
      },
    )

    return () => {
      unsubscribeAuthStateListener()
      unsubscribeIdTokenListener()
    }
  }, [])

  function signOut() {
    setUser(null)
    setStatus(undefined)
    setProviderType(undefined)
    setAccessToken(undefined)
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
    isLoggedIn,
    isLoading,
    status,
    providerType,
    accessToken,
    signOut,
    signInGoogle,
    signInKakao,
  }
}
