import { Model } from 'objection'

export default class Session extends Model {
  static tableName = 'users'

  static jsonSchema = {
    type: 'object',
    required: ['key', 'ttl'],

    properties: {
      key: {
        type: 'string',
      },

      ttl: {
        type: 'integer',
      },
    },
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'sessions.key',
        to: 'users.id',
      },
    },
  }

  static getSessions() {
    return Session.query()
  }

  static getSessionByKey(key) {
    return Session.query().where({ key }).then(x => x[0])
  }

  static getSessionByUserId(userId) {
    return Session.query().where({ userId }).then(x => x[0])
  }
}
