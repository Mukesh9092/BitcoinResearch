import Article from '../../models/Article'
import Comment from '../../models/Comment'

export default {
  articles(root) {
    return Article.getArticlesByUserId(root.id)
  },

  comments(root) {
    return Comment.getCommentsByUserId(root.id)
  },
}
