import { Model } from 'objection'

import Tag from './Tag'
import User from './User'

export default class Article extends Model {
  static tableName = 'articles'

  static jsonSchema = {
    type: 'object',
    required: ['title', 'slug', 'body', 'created', 'updated'],

    properties: {
      id: {
        type: 'integer',
      },

      title: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },

      slug: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
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
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'articles.userId',
        to: 'users.id',
      },
    },

    comments: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Comment`,
      join: {
        from: 'articles.id',
        to: 'comments.articleId',
      },
    },

    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Tag`,
      join: {
        from: 'articles.id',
        through: {
          from: 'articles_tags.articleId',
          to: 'articles_tags.tagId',
        },
        to: 'tags.id',
      },
    },
  }

  static getArticles(offset, limit) {
    return Article
      .query()
      .offset(offset)
      .limit(limit)
  }

  static getArticlesByUserId(userId, offset, limit) {
    return Article
      .query()
      .where({ userId })
      .offset(offset)
      .limit(limit)
  }

  static getArticlesByUsername(username, offset, limit) {
    return User
      .query()
      .where({ username })
      .then(([user]) => {
        return user
          .$relatedQuery('articles')
          .offset(offset)
          .limit(limit)
      })
  }

  static getArticlesByTag(tag, offset, limit) {
    return Tag
      .query()
      .where({ label: tag })
      .then(([tag]) => {
        return tag
          .$relatedQuery('articles')
          .offset(offset)
          .limit(limit)
      })
  }

  static getArticleById(id) {
    return Article
      .query()
      .where({ id })
      .then(x => x[0])
  }

  static getArticleBySlug(slug) {
    return Article
      .query()
      .where({ slug })
      .then(x => x[0])
  }
}
