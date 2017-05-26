import Article from '../../models/Article'
import Comment from '../../models/Comment'
import User from '../../models/User'

import firstResult from '../helpers/firstResult'
import jsonResult from '../helpers/jsonResult'

export default {
  user(root) {
    return User.query()
      .where({ id: root.userId })
      .then(firstResult)
      .then(jsonResult)
  },

  tags(root) {
    return Article.query()
      .findById(root.id)
      .then(result => result.$relatedQuery('tags'))
      .then(jsonResult)
  },

  comments(root) {
    return Comment.query().where({ articleId: root.id }).then(jsonResult)
  },
}
