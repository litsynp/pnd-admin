'use client'
import { KakaoLoginButton, KakaoScript } from '@/auth/kakao-auth'
import { useAuth } from '@/auth/use-auth'

export default function LoginPage() {
  const { signInGoogle } = useAuth()

  return (
    <main className="flex flex-col items-center justify-center space-y-4 py-40">
      {KakaoScript()}

      <h1 className="text-xl font-bold">로그인</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={signInGoogle}
      >
        구글 로그인
      </button>

      <KakaoLoginButton className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" />
    </main>
  )
}
