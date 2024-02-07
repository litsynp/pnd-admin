import { fetchJson } from '@/helper/fetcher'

import { KakaoProfileResponse } from '.'

function findKakaoProfile({
  accessToken,
}: {
  accessToken: string
}): Promise<KakaoProfileResponse> {
  return fetchJson('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const kakaoClient = {
  findKakaoProfile,
}
