import Article from '../../models/Article'
import User from '../../models/User'

import jsonResult from '../helpers/jsonResult'

export default {
  article(root) {
    return Article.query().findById(root.articleId).then(jsonResult)
  },

  user(root) {
    return User.query().findById(root.userId).then(jsonResult)
  },
}
