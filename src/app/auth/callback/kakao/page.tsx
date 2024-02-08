'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import { useAuth } from '@/auth/use-auth'
import { KAKAO_REDIRECT_URI, KAKAO_REST_API_KEY } from '@/config'
import {
  CreateKakaoCustomTokenResponse,
  authClient,
} from '@/infrastructure/pnd/client/auth.client'

export default function KakaoCallbackPage() {
  const router = useRouter()

  const [accessToken, setAccessToken] = useState('')
  const [authResult, setAuthResult] = useState<CreateKakaoCustomTokenResponse>()
  const { user, signInKakao } = useAuth()

  async function fetchCreateKakaoCustomToken() {
    if (!accessToken) {
      return
    }
    const response = await authClient.createKakaoCustomToken({
      oauthToken: accessToken,
    })

    setAuthResult(response)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-40 overflow-auto">
      <h1 className="text-xl font-bold">Kakao callback</h1>

      <Suspense fallback={<>Loading...</>}>
        <KakaoAuthTokenSection />
      </Suspense>

      <div className="flex flex-row items-center justify-center space-x-4">
        <span>{accessToken ? '✅' : '❌'} Access token:</span>
        <input
          className="p-2 border border-gray-300 rounded"
          type="text"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
        />

        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          onClick={fetchCreateKakaoCustomToken}
          disabled={!accessToken}
        >
          2. Fetch custom token
        </button>
      </div>

      {authResult && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <span className="flex items-center space-x-4">Your Response:</span>
          <pre
            className="bg-gray-200 p-4 rounded whitespace-pre-wrap break-words"
            style={{ maxWidth: '80vw' }}
          >
            {JSON.stringify(authResult, null, 2)}
          </pre>
        </div>
      )}

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        onClick={() => {
          if (authResult) {
            signInKakao(authResult)
          }
        }}
        disabled={!authResult}
      >
        3. Sign in with custom token
      </button>

      {user && (
        <span className="flex items-center space-x-4">
          {user ? '✅' : '❌'} Firebase User: {user?.displayName} ({user?.email}
          )
        </span>
      )}

      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push('/auth/login')}
      >
        Back to login
      </button>
    </div>
  )
}

function KakaoAuthTokenSection() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const request = {
    grant_type: 'authorization_code',
    client_id: KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    code,
  }

  return (
    <div
      className="flex items-center space-x-4 cursor-pointer"
      onClick={() => console.log(request)}
    >
      {code ? '✅' : '❌'} Code:
      <p className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded w-64">
        {code?.slice(0, 10)}...
      </p>
      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href={`https://kauth.kakao.com/oauth/token?${new URLSearchParams(
          request as unknown as Record<string, string>,
        )}`}
      >
        1. Request token
      </a>
    </div>
  )
}
