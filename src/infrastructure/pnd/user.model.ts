export const FIREBASE_PROVIDER_TYPES = [
  'email',
  'kakao',
  'google',
  'apple',
] as const
export type FirebaseProviderType = (typeof FIREBASE_PROVIDER_TYPES)[number]

export const USER_STATUS = ['NOT_REGISTERED', 'REGISTERED'] as const
export type UserStatus = (typeof USER_STATUS)[number]
