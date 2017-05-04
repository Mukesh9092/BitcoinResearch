import { Model } from 'objection'

export default class Comment extends Model {
  static tableName = 'comments'

  static jsonSchema = {
    type: 'object',
    required: ['body', 'created', 'updated'],

    properties: {
      id: {
        type: 'integer',
      },

      body: {
        type: 'string',
      },

      created: {
        type: 'date',
      },

      updated: {
        type: 'date',
      },
    },
  }

  static relationMappings = {
    article: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'comments.articleId',
        to: 'articles.id',
      },
    },

    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'comments.userId',
        to: 'users.id',
      },
    },
  }

  static getCommentsByUserId(userId) {
    return Comment
      .query()
      .where({ userId })
  }
}
