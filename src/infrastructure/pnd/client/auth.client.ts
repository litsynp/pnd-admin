import { fetchJson } from '@/helper/fetcher'
import { FirebaseProviderType } from '../user.model'
import { generateJsonHeader } from '../header'

export interface CreateKakaoCustomTokenResponse {
  authToken: string
  email: string
  fbProviderType: FirebaseProviderType
  fbUid: string
  photoURL: string
}

function createKakaoCustomToken({
  oauthToken,
}: {
  oauthToken: string
}): Promise<CreateKakaoCustomTokenResponse> {
  return fetchJson<CreateKakaoCustomTokenResponse>(
    `/api/auth/custom-tokens/kakao`,
    {
      method: 'POST',
      headers: generateJsonHeader(),
      body: JSON.stringify({ oauthToken }),
    },
  )
}

export const authClient = {
  createKakaoCustomToken,
}
