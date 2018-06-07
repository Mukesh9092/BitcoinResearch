import scrypt from 'scrypt-for-humans'

export async function generateHash(password) {
  const result = await scrypt.hash(password)

  return result
}

export async function verifyPassword(password, hash) {
  const result = await scrypt.verifyHash(password, hash)

  return result
}
