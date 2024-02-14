export function generateJsonHeader() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export function generateAuthHeader(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
  }
}
