import scrypt from 'scrypt';

export async function generateHash(password: string): string {
  const result = await scrypt.hash(password);

  return result;
}

export async function verifyPassword(password: string, hash: string) {
  const result = await scrypt.verifyHash(password, hash);

  return result;
}
