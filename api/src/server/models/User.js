import { Model } from 'objection'

export default class User extends Model {
  static tableName = 'users'

  static jsonSchema = {
    type: 'object',
    required: ['email', 'username', 'password'],

    properties: {
      id: {
        type: 'integer',
      },

      email: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },

      username: {
        type: 'string',
        minLength: 1,
        maxLength: 24,
      },

      password: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
  }

  static relationMappings = {
    articles: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'users.id',
        to: 'articles.userId',
      },
    },

    comments: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Comment`,
      join: {
        from: 'users.id',
        to: 'comments.userId',
      },
    },
  }

  static getUsers() {
    return User
      .query()
  }

  static getUserById(id) {
    return User
      .query()
      .where({ id })
      .then(x => x[0])
  }

  static getUserByEmail(email) {
    return User
      .query()
      .where({ email })
      .then(x => x[0])
  }

  static getUserByUsername(username) {
    return User
      .query()
      .where({ username })
      .then(x => x[0])
  }
}
