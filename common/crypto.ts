import scrypt from 'scrypt-for-humans';

export async function generateHash(password: string): Promise<string> {
  const result = await scrypt.hash(password);

  return result;
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<string> {
  const result = await scrypt.verifyHash(password, hash);

  return result;
}
