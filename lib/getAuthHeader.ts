export function getAuthHeader(): { Authorization?: string } {
  if (typeof document === 'undefined') return {}
  const auth = document.cookie
    .split('; ')
    .find((row) => row.startsWith('auth='))
    ?.split('=')[1]
  return auth ? { Authorization: `Bearer ${auth}` } : {}
}