import { createHmac, randomBytes } from 'crypto';

export function genRandomString(length: number): string {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

interface Sha12Result {
  salt: string;
  passwordHash: string;
}

export function sha512(password: string, salt: string): Sha12Result {
  return {
    salt,
    passwordHash: createHmac('sha512', salt)
      .update(password)
      .digest('hex')
  };
}
