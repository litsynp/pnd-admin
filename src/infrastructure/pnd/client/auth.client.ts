import { fetchJson } from '@/helper/fetcher'
import { FirebaseProviderType } from '../user.model'

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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oauthToken }),
    },
  )
}

export const authClient = {
  createKakaoCustomToken,
}
