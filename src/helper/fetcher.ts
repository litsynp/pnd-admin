import { firebaseAuth } from '@/auth/firebase-app'

export const fetchJson = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, init)

  if (!response.ok) {
    const errorRes: unknown = await response.json()

    console.error('fetchJson error:', errorRes)

    let message =
      (errorRes as { message: string }).message || '잠시 후 다시 시도해주세요.'
    if (response.status === 401) {
      firebaseAuth.currentUser?.getIdToken(true)
      message = '인증이 필요합니다.'
    }

    alert(message)

    throw new Error(message)
  }

  if (response.status === 204) {
    return {} as T
  }

  const data = (await (response.headers
    .get('Content-Type')
    ?.includes('application/json')
    ? response.json()
    : response.text())) as unknown

  return data as T
}
