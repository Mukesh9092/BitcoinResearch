

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _lodash = require('lodash');

const _lodash2 = _interopRequireDefault(_lodash);

const _loglevel = require('loglevel');

const _loglevel2 = _interopRequireDefault(_loglevel);

const _passport = require('passport');

const _passport2 = _interopRequireDefault(_passport);

const _language = require('graphql/language');

const _Article = require('../models/Article');

const _Article2 = _interopRequireDefault(_Article);

const _Comment = require('../models/Comment');

const _Comment2 = _interopRequireDefault(_Comment);

const _Tag = require('../models/Tag');

const _Tag2 = _interopRequireDefault(_Tag);

const _User = require('../models/User');

const _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const firstResult = function firstResult(a) {
  return a[0];
};
const jsonResult = function jsonResult(a) {
  return _lodash2.default.isArray(a) ? _lodash2.default.invokeMap(a, 'toJSON') : a.toJSON();
};

exports.default = {
  Date: {
    __parseValue: function __parseValue(value) {
      return new Date(value); // value from the client
    },
    __serialize: function __serialize(value) {
      return value.getTime(); // value sent to the client
    },
    __parseLiteral: function __parseLiteral(ast) {
      if (ast.kind === _language.Kind.INT) {
        return +ast.value;
      }

      return null;
    },
  },

  Article: {
    user: function user(root, args, context) {
      return _User2.default.query().where({ id: root.userId }).then(firstResult).then(jsonResult);
    },
    tags: function tags(root, args, context) {
      return _Article2.default.query().findById(root.id).then((result) => {
        return result.$relatedQuery('tags');
      }).then(jsonResult);
    },
    comments: function comments(root, args, context) {
      return _Comment2.default.query().where({ articleId: root.id }).then(jsonResult);
    },
  },

  Comment: {
    article: function article(root, args, context) {
      return _Article2.default.query().findById(root.articleId).then(jsonResult);
    },
    user: function user(root, args, context) {
      return _User2.default.query().findById(root.userId).then(jsonResult);
    },
  },

  Tag: {
    articles: function articles(root, args, context) {
      return _Tag2.default.query().findById(root.id).then((result) => {
        return result.$relatedQuery('articles');
      }).then(jsonResult);
    },
  },

  User: {
    articles: function articles(root, args, context) {
      return _Article2.default.getArticlesByUserId(root.id);
    },
    comments: function comments(root, args, context) {
      return _Comment2.default.getCommentsByUserId(root.id);
    },
  },

  Query: {
    articles: function articles(root, args, context) {
      let offset = args.offset,
        limit = args.limit;


      _loglevel2.default.debug('GraphQL.Resolvers.Query.articles', offset, limit);

      return _Article2.default.getArticles(offset, limit).then(jsonResult);
    },
    articlesByUser: function articlesByUser(root, args, context) {
      let username = args.username,
        offset = args.offset,
        limit = args.limit;


      _loglevel2.default.debug('GraphQL.Resolvers.Query.articlesByUser', tag, offset, limit);

      return _Article2.default.getArticlesByUsername(username, offset, limit).then(jsonResult);
    },
    articlesByTag: function articlesByTag(root, args, context) {
      let tag = args.tag,
        offset = args.offset,
        limit = args.limit;


      _loglevel2.default.debug('GraphQL.Resolvers.Query.articlesByUser', tag, offset, limit);

      return _Article2.default.getArticlesByTag(tag, offset, limit).then(jsonResult);
    },
    articleById: function articleById(root, args, context) {
      _loglevel2.default.debug('GraphQL.Resolvers.Query.articlesById');

      return _Article2.default.getArticleById(args.id).then(jsonResult);
    },
    articleBySlug: function articleBySlug(root, args, context) {
      _loglevel2.default.debug('GraphQL.Resolvers.Query.articleBySlug');

      return _Article2.default.getArticleBySlug(args.slug).then(jsonResult);
    },
    tags: function tags(root, args, context) {
      _loglevel2.default.debug('GraphQL.Resolvers.Query.tags');

      return _Tag2.default.getTags().then(jsonResult);
    },
    users: function users(root, args, context) {
      _loglevel2.default.debug('GraphQL.Resolvers.Query.users');

      return _User2.default.getUsers().then(jsonResult);
    },
    userById: function userById(root, args, context) {
      _loglevel2.default.debug('GraphQL.Resolvers.Query.userById');

      return _User2.default.getUserById(args.id).then(jsonResult);
    },
    userByEmail: function userByEmail(root, args, context) {
      _loglevel2.default.debug('GraphQL.Resolvers.Query.userByEmail');

      return _User2.default.getUserByEmail(args.email).then(jsonResult);
    },
    userByUsername: function userByUsername(root, args, context) {
      _loglevel2.default.debug('GraphQL.Resolvers.Query.userByUsername');

      return _User2.default.getUserByUsername(args.username).then(jsonResult);
    },
  },

  Mutation: {
    sessionWithEmail: function sessionWithEmail(root, args, context) {
      let email = args.email,
        password = args.password;


      _loglevel2.default.debug('GraphQL.Resolvers.Mutation.sessionWithEmail', email, password);

      _passport2.default.authenticate('local');

      // TODO: Hashing function?
      return _User2.default.query().where({ email, password });

      return false;
    },
  },
};
