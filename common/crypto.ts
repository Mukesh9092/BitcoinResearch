import scrypt from 'scrypt-for-humans';

export async function generateHash(password: string): string {
  // console.log('generateHash', password);

  const result = await scrypt.hash(password);

  // console.log('generateHash result', password, result);

  return result;
}

export async function verifyPassword(password: string, hash: string) {
  // console.log('verifyHash', password, hash);

  const result = await scrypt.verifyHash(password, hash);

  // console.log('verifyHash result', password, hash, true);

  return result;
}
