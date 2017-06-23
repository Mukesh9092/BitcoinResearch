{ Model } = require 'objection'

export class Tag extends Model
  tableName = 'tags'

  jsonSchema =
    type: 'object'
    required: <[ label ]>
    properties:
      id:
        type: 'integer'
      label:
        type: 'string'
        min-length: 1
        max-length: 255

  relation-mappings =
    articles:
      relation: Model.ManyToManyRelation
      model-class: "#{__dirname}/Article"
      join:
        from: 'tags.id'
        through:
          from: 'articles_tags.tagId'
          to: 'articles_tags.articleId'
        to: 'articles.id'

  get-tags: ->
    @query!
