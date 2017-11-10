const { isDate, isString, isNumber } = require('lodash');

module.exports = {
  __serialize: value => {
    return value;
  },

  __parseValue: value => {
    if (isNumber(value)) {
      return value;
    }

    if (isDate(value)) {
      return value.valueOf();
    }

    return new Date(value).valueOf();
  },

  __parseLiteral: ast => {
    return ast.value;
  },
}
