import { fetchJson } from '@/helper/fetcher'
import { FirebaseProviderType, UserStatus } from '../user.model'
import { generateAuthHeader, generateJsonHeader } from '../header'

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
    headers: generateJsonHeader(),
    body: JSON.stringify({ email }),
  })
}

interface RegisterUserResponse {
  id: string
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
    headers: generateJsonHeader(),
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
    headers: generateJsonHeader(),
    body: JSON.stringify({ nickname }),
  })
}

export interface MyProfileResponse {
  id: string
  email: string
  nickname: string
  fullname: string
  fbProviderType: FirebaseProviderType
  profileImageUrl?: string
}

function findMyProfile({
  accessToken,
}: {
  accessToken: string
}): Promise<MyProfileResponse> {
  return fetchJson<MyProfileResponse>(`/api/users/me`, {
    method: 'GET',
    headers: {
      ...generateJsonHeader(),
      ...generateAuthHeader(accessToken),
    },
  })
}

function deleteMyAccount({
  accessToken,
}: {
  accessToken: string
}): Promise<void> {
  return fetchJson<void>(`/api/users/me`, {
    method: 'DELETE',
    headers: {
      ...generateJsonHeader(),
      ...generateAuthHeader(accessToken),
    },
  })
}

export const userClient = {
  checkUserStatus,
  registerUser,
  checkUsername,
  findMyProfile,
  deleteMyAccount,
}
