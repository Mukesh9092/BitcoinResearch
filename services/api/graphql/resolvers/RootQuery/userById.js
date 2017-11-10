const store = require('../../../lib/database/store')

module.exports = (obj, { id }) => {
  return store.find('user', id)
};
