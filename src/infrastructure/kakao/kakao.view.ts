export interface KakaoTokenQueries {
  grant_type: 'authorization_code'
  client_id: string
  redirect_uri: string
  code: string
}

export interface KakaoTokenResponse {
  token_type: string
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
}

export interface KakaoProfileResponse {
  id: number
  connected_at: string
  kakao_account: {
    profile_needs_agreement: boolean
    profile: {
      nickname: string
      thumbnail_image_url: string
      profile_image_url: string
    }
    has_email: boolean
    email_needs_agreement: boolean
    is_email_valid: boolean
    is_email_verified: boolean
    email: string
    has_age_range: boolean
    age_range_needs_agreement: boolean
    age_range: string
    has_gender: boolean
    gender_needs_agreement: boolean
    gender: string
  }
}
