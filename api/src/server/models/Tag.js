import { Model } from 'objection'

export default class Tag extends Model {
  static tableName = 'tags'

  static jsonSchema = {
    type: 'object',
    required: ['label'],

    properties: {
      id: {
        type: 'integer',
      },

      label: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
  }

  static relationMappings = {
    articles: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'tags.id',
        through: {
          from: 'articles_tags.tagId',
          to: 'articles_tags.articleId',
        },
        to: 'articles.id',
      },
    },
  }

  static getTags() {
    return Tag
      .query()
  }
}
