import { fetchJson } from '@/helper/fetcher'
import { FirebaseProviderType, UserStatus } from '../user.model'

interface CheckUserStatusResponse {
  fbProviderType: FirebaseProviderType
  status: UserStatus
}

function checkUserStatus({
  email,
}: {
  email: string
}): Promise<CheckUserStatusResponse> {
  return fetchJson<CheckUserStatusResponse>(`/api/users/status`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
}

interface RegisterUserResponse {
  id: number
  email: string
  fbProviderType: FirebaseProviderType
  fbUid: string
  fullname: string
  nickname: string
  profileImageUrl?: string
}

function registerUser({
  email,
  fbProviderType,
  fbUid,
  fullname,
  nickname,
  profileImageId,
}: {
  email: string
  fbProviderType: FirebaseProviderType
  fbUid: string
  fullname: string
  nickname: string
  profileImageId?: string
}): Promise<RegisterUserResponse> {
  console.log(
    JSON.stringify({
      email,
      fbProviderType,
      fbUid,
      fullname,
      nickname,
      profileImageId,
    }),
  )

  return fetchJson<RegisterUserResponse>(`/api/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      fbProviderType,
      fbUid,
      fullname,
      nickname,
      profileImageId,
    }),
  })
}

interface CheckUsernameResponse {
  isAvailable: boolean
}

function checkUsername({
  nickname,
}: {
  nickname: string
}): Promise<CheckUsernameResponse> {
  return fetchJson<CheckUsernameResponse>(`/api/users/check/nickname`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname }),
  })
}

export const userClient = {
  checkUserStatus,
  registerUser,
  checkUsername,
}
