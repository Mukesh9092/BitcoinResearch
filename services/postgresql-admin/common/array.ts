export function ensureArray(xs: any | any[]) {
  return Array.isArray(xs) ? xs : [xs];
}
