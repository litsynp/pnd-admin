import Script from 'next/script'

import {
  KAKAO_JS_KEY,
  KAKAO_JS_SDK_INTEGRITY,
  KAKAO_JS_SDK_VERSION,
  KAKAO_REDIRECT_URI,
} from '@/config'

interface KakaoSdk {
  isInitialized: () => boolean
  init: (key: string) => void
  Auth: {
    authorize: (options: { redirectUri: string; scope?: string }) => void
  }
}

export function KakaoScript() {
  function initializeKakao() {
    // @ts-ignore
    const kakao: KakaoSdk | null = window ? window.Kakao : null

    kakao?.init(KAKAO_JS_KEY)
    console.log('Kakao initialized:', kakao?.isInitialized())
  }

  return (
    <Script
      src={`https://t1.kakaocdn.net/kakao_js_sdk/${KAKAO_JS_SDK_VERSION}/kakao.min.js`}
      integrity={KAKAO_JS_SDK_INTEGRITY}
      crossOrigin="anonymous"
      onLoad={initializeKakao}
    ></Script>
  )
}

export function KakaoLoginButton({ className }: { className?: string }) {
  const scopes = [
    'profile_nickname',
    'profile_image',
    'account_email',
    'gender',
    'age_range',
  ]

  function loginWithKakao() {
    // @ts-ignore
    const kakao: KakaoSdk | null = window ? window.Kakao : null

    kakao?.Auth.authorize({
      redirectUri: KAKAO_REDIRECT_URI,
      scope: scopes.join(','),
    })
  }

  function onClick() {
    loginWithKakao()
  }

  return (
    <button className={className} onClick={onClick}>
      Sign in with Kakao
    </button>
  )
}
