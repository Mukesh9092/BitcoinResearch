export default {
  __serialize: (value) => {
    return value
  },

  __parseValue: (value) => {
    if (typeof value === 'number') {
      return value
    }

    if (value instanceof Date) {
      return value.valueOf()
    }

    return new Date(value).valueOf()
  },

  __parseLiteral: (ast) => {
    return ast.value
  },
}
