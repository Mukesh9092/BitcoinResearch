{ Model } = require 'objection'

export class Comment extends Model
  table-name = 'articles'

  json-schema =
    type: 'object' ,
    required: <[ body created updated ]>

    properties:
      id:
        type: 'integer'

      body:
        type: 'string'

      created:
        type: 'date'

      updated:
        type: 'date'

  relation-mappings =
    article:
      relation: Model.BelongsToOneRelation
      modelClass: "#{__dirname}/Article"
      join:
        from: 'comments.articleId'
        to: 'articles.id'

    user:
      relation: Model.BelongsToOneRelation
      modelClass: "#{__dirname}/User"
      join:
        from: 'comments.userId'
        to: 'users.id'

  get-comments-by-user-id: (userId) ->
    @query!
      .where userId: userId
