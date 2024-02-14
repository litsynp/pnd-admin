export const PND_API_BASE_URL =
  process.env.PND_API_BASE_URL || 'http://localhost:8080'

export const KAKAO_REDIRECT_URI =
  process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ||
  'http://localhost:3000/auth/callback/kakao'
export const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY || ''

export const KAKAO_JS_SDK_VERSION =
  process.env.NEXT_PUBLIC_KAKAO_JS_SDK_VERSION || ''
export const KAKAO_JS_SDK_INTEGRITY =
  process.env.NEXT_PUBLIC_KAKAO_JS_SDK_INTEGRITY || ''
export const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || ''

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
}
