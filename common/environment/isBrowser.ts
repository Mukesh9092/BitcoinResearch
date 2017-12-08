let result: boolean;

export default function isBrowser(): boolean {
  if (result) {
    return result;
  }

  result = typeof window !== 'undefined';

  return result;
}
