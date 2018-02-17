export function __serialize(value: any): any {
  return value;
}

export function __parseValue(value: any): number {
  if (typeof value === 'number') {
    return value;
  }

  if (value instanceof Date) {
    return value.valueOf();
  }

  return new Date(value).valueOf();
}

// TODO: Find out type of ast and ast.value
export function __parseLiteral(ast: any): any {
  return ast.value;
}
