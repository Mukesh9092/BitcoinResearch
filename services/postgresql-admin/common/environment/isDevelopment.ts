let result: boolean;

export default function isDevelopment(): boolean {
  if (result) {
    return result;
  }

  result = process.env.NODE_ENV === 'develop';

  return result;
}
