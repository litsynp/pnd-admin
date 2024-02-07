'use client'
import { Auth, signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'

import { KakaoLoginButton, KakaoScript } from '@/auth/kakao-auth'
import { firebaseAuth } from '@/auth/firebase-app'

export default function LoginPage() {
  async function signInGoogle({ auth }: { auth: Auth }) {
    const provider = new GoogleAuthProvider()

    // TODO: implement Google sign in
    const data = await signInWithPopup(auth, provider)
    console.log(data)
  }

  function signOut({ auth }: { auth: Auth }) {
    auth.signOut()
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {KakaoScript()}

      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-xl font-bold">Login to PND with Firebase</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signInGoogle({ auth: firebaseAuth })}
        >
          Sign in with Google
        </button>

        <KakaoLoginButton className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" />

        {firebaseAuth.currentUser && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut({ auth: firebaseAuth })}
          >
            Sign out
          </button>
        )}
      </div>
    </main>
  )
}
