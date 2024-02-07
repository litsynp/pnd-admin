import { PND_API_BASE_URL } from '@/config'
import { fetchJson } from '@/helper/fetcher'

export interface CreateKakaoCustomTokenResponse {
  authToken: string
  email: string
  fbProviderType: 'email' | 'kakao' | 'google' | 'apple'
  fbUid: string
  photoURL: string
}

async function createKakaoCustomToken({
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
