'use client'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/auth/use-auth'

export function NavBar() {
  const router = useRouter()
  const { user, status, providerType: fbProviderType, signOut } = useAuth()

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: '1px solid #eaeaea',
      }}
    >
      <div className="left-container flex items-center space-x-4">
        <span
          className="cursor-pointer text-2xl font-bold"
          onClick={() => {
            router.push('/')
          }}
        >
          PND Admin
        </span>
      </div>

      <div className="middle-container"></div>

      <div className="right-container flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <div>
              {user?.email} / {fbProviderType}{' '}
              {status === 'REGISTERED' ? '✅' : '❌'}
            </div>
            <div className="cursor-pointer" onClick={signOut}>
              로그아웃
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push('/auth/login')
            }}
          >
            로그인
          </div>
        )}
      </div>
    </header>
  )
}
