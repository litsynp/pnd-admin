'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/auth/use-auth'
import { userClient } from '@/infrastructure/pnd/client/user.client'
import {
  FIREBASE_PROVIDER_TYPES,
  FirebaseProviderType,
} from '@/infrastructure/pnd/user.model'

export default function RegisterPage() {
  const router = useRouter()

  const { user } = useAuth()

  const email = user?.email
  const [fullname, setFullname] = useState(user?.displayName || '')
  const [nickname, setNickname] = useState('')
  const fbUid = user?.uid
  const [fbProviderType, setFbProviderType] = useState<FirebaseProviderType>()
  const [profileImageId, setProfileImageId] = useState()
  const [nicknameDuplicateStatus, setNicknameDuplicateStatus] =
    useState<NicknameStatus>('NO_INPUT')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (email && fbUid) {
      setLoading(false)
    }
  }, [email, fbUid])

  async function fetchRegisterUser() {
    if (!email || !fbUid || !fbProviderType) {
      return
    }

    try {
      const result = await userClient.registerUser({
        email,
        fullname,
        nickname,
        fbUid,
        fbProviderType,
        profileImageId,
      })

      alert('회원가입이 완료되었습니다: ' + JSON.stringify(result, null, 2))
    } catch (error) {
      alert('회원가입에 실패했습니다.')
      console.error(error)
    }
  }

  useEffect(() => {
    const DELAY = 300

    if (!nickname) {
      setNicknameDuplicateStatus('NO_INPUT')
      return
    }

    const timeout = setTimeout(async () => {
      if (!nickname) {
        return
      }

      setNicknameDuplicateStatus('LOADING')

      if (!(await userClient.checkUsername({ nickname }))) {
        setNicknameDuplicateStatus('DUPLICATE')
      } else {
        setNicknameDuplicateStatus('AVAILABLE')
      }
    }, DELAY)

    return () => clearTimeout(timeout)
  }, [nickname])

  return (
    <main className="flex flex-col items-center justify-center space-y-4 py-40 overflow-auto">
      <h1>PND 회원가입</h1>

      {loading && (
        <div className="flex items-center justify-center w-96 h-96 rounded">
          Loading...
        </div>
      )}

      {email && fbUid && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Input name="*이메일" field={email} disabled />
          <Input name="*이름" field={fullname} setField={setFullname} />
          <Input name="*닉네임" field={nickname} setField={setNickname} />
          <CheckNicknameStatusResult status={nicknameDuplicateStatus} />
          <Selection
            name="*FB Provider Type"
            field={fbProviderType}
            setField={setFbProviderType}
            options={FIREBASE_PROVIDER_TYPES}
          />
          <Input name="*FB UID" field={fbUid || ''} disabled />
          <Input
            type="number"
            name="프로필 이미지 ID"
            field={profileImageId}
            setField={setProfileImageId}
          />

          <div className="flex flex-row items-center justify-between space-x-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={fetchRegisterUser}
            >
              회원가입
            </button>

            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/')}
            >
              메인으로
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

type NicknameStatus = 'NO_INPUT' | 'LOADING' | 'DUPLICATE' | 'AVAILABLE'

function CheckNicknameStatusResult({ status }: { status: NicknameStatus }) {
  const ResultSpan = ({ text }: { text: string }) => (
    <span className="flex items-center justify-between text-sm">{text}</span>
  )

  if (status === 'NO_INPUT') {
    return null
  }

  if (status === 'LOADING') {
    return <ResultSpan text="중복 확인 중..." />
  }

  if (status === 'DUPLICATE') {
    return <ResultSpan text="❌ 중복된 닉네임입니다." />
  }

  if (status === 'AVAILABLE') {
    return <ResultSpan text="✅ 중복되지 않은 닉네임입니다." />
  }
}

function Input({
  type,
  name,
  field,
  setField,
  disabled,
}: {
  type?: 'text' | 'password' | 'email' | 'number'
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setField?: (value: any) => void
  disabled?: boolean
}) {
  return (
    <span className="flex flex-row items-center space-x-4 w-96 justify-between">
      <span>{name}</span>
      <input
        className="border border-gray-400 rounded px-2 py-1 disabled:bg-gray-200"
        type={type || 'text'}
        value={field}
        onChange={(e) => setField && setField(e.target.value)}
        disabled={disabled}
      />
    </span>
  )
}

function Selection({
  name,
  field,
  setField,
  options,
}: {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setField?: (value: any) => void
  options: readonly string[]
}) {
  return (
    <span className="flex flex-row items-center space-x-4 w-96 justify-between">
      <span>{name}</span>
      <select
        className="border border-gray-400 rounded px-2 py-1"
        value={field}
        onChange={(e) => setField && setField(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  )
}
