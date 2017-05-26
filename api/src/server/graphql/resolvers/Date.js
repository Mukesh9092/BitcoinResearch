import { Kind } from 'graphql/language'

export default {
  // value from the client
  __parseValue(value) {
    return new Date(value)
  },

  // value sent to the client
  __serialize(value) {
    return value.getTime()
  },

  // TODO: Document.
  __parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return +ast.value
    }

    return null
  },
}
