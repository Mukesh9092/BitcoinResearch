import { createHmac, randomBytes } from "crypto";

export function genRandomString(length: number) {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

export function sha512(password: string, salt: string) {
  return {
    salt,
    passwordHash: createHmac("sha512", salt)
      .update(password)
      .digest("hex")
  };
}
