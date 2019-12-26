import { compare, hash } from 'bcrypt'

export const generateHash = async (password: string): Promise<string> => {
  return hash(password, 12)
}

export const isValidPassword = async (password: string, hash: string): Promise<boolean> => {
  return compare(password, hash)
}
