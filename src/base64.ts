const chars = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  'abcdefghijklmnopqrstuvwxyz' +
  '0123456789' +
  '+/'

export function randomBase64 (length: number = 10) {
  let base64String = ''
  for (let i = 0; i < length; i++) {
    base64String += chars[Math.floor(Math.random() * chars.length)]
  }
  return base64String
}