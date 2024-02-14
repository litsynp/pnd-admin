'use client'
import { useEffect, useState } from 'react'

import { useAuth } from '@/auth/use-auth'
import {
  MyProfileResponse,
  userClient,
} from '@/infrastructure/pnd/client/user.client'
import Image from 'next/image'

export default function MyProfilePage() {
  const { user, signOut } = useAuth()
  const [myProfile, setMyProfile] = useState<MyProfileResponse>()

  useEffect(() => {
    async function fetchAndSetMyProfile() {
      const accessToken = await user?.getIdToken()
      if (!accessToken) {
        return
      }

      const myProfile = await userClient.findMyProfile({ accessToken })
      setMyProfile(myProfile)
    }

    fetchAndSetMyProfile()
  }, [user])

  async function deleteMyAccount() {
    const confirm = window.confirm('정말로 탈퇴하시겠습니까?')

    const accessToken = await user?.getIdToken()
    if (!accessToken) {
      return
    }

    if (confirm) {
      userClient.deleteMyAccount({ accessToken })
      signOut()
    }
  }

  return (
    <main className="flex flex-col items-center justify-center w-full px-20 text-center py-40">
      <h1 className="text-2xl font-bold">내 정보</h1>

      <div className="flex flex-col items-center space-y-4 mt-8">
        <div
          className="flex items-center justify-center rounded-full bg-gray-200 border-4 border-gray-300"
          style={{ width: 100, height: 100 }}
        >
          {myProfile?.profileImageUrl ? (
            <Image
              src={myProfile?.profileImageUrl}
              width={100}
              height={100}
              alt="Profile Image"
            />
          ) : (
            <div>이미지 없음</div>
          )}
        </div>

        <h2>이메일: {myProfile?.email}</h2>
        <h2>FB Provider Type: {myProfile?.fbProviderType}</h2>
        <h2>닉네임: {myProfile?.nickname}</h2>
        <h2>이름: {myProfile?.fullname}</h2>
      </div>

      <div className="flex flex-col items-center justify-center w-full mt-8">
        <button
          className="rounded-md bg-red-500 text-white px-4 py-2 mt-4 cursor-pointer"
          onClick={deleteMyAccount}
        >
          회원 탈퇴
        </button>
      </div>
    </main>
  )
}
