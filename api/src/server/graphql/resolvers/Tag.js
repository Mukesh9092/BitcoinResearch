import Tag from '../../models/Tag'

import jsonResult from '../helpers/jsonResult'

export default {
  articles(root) {
    return Tag.query()
      .findById(root.id)
      .then(result => result.$relatedQuery('articles'))
      .then(jsonResult)
  },
}
