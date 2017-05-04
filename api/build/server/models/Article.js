

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = undefined;

const _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

const _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

const _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

const _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

const _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

const _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

const _createClass2 = require('babel-runtime/helpers/createClass');

const _createClass3 = _interopRequireDefault(_createClass2);

const _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

const _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

const _inherits2 = require('babel-runtime/helpers/inherits');

const _inherits3 = _interopRequireDefault(_inherits2);

const _objection = require('objection');

const _Tag = require('./Tag');

const _Tag2 = _interopRequireDefault(_Tag);

const _User = require('./User');

const _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Article = (function (_Model) {
  (0, _inherits3.default)(Article, _Model);

  function Article() {
    (0, _classCallCheck3.default)(this, Article);
    return (0, _possibleConstructorReturn3.default)(this, (Article.__proto__ || (0, _getPrototypeOf2.default)(Article)).apply(this, arguments));
  }

  (0, _createClass3.default)(Article, null, [{
    key: 'getArticles',
    value: function getArticles(offset, limit) {
      return Article.query().offset(offset).limit(limit);
    },
  }, {
    key: 'getArticlesByUserId',
    value: function getArticlesByUserId(userId, offset, limit) {
      return Article.query().where({ userId }).offset(offset).limit(limit);
    },
  }, {
    key: 'getArticlesByUsername',
    value: function getArticlesByUsername(username, offset, limit) {
      return _User2.default.query().where({ username }).then((_ref) => {
        let _ref2 = (0, _slicedToArray3.default)(_ref, 1),
          user = _ref2[0];

        return user.$relatedQuery('articles').offset(offset).limit(limit);
      });
    },
  }, {
    key: 'getArticlesByTag',
    value: function getArticlesByTag(tag, offset, limit) {
      return _Tag2.default.query().where({ label: tag }).then((_ref3) => {
        let _ref4 = (0, _slicedToArray3.default)(_ref3, 1),
          tag = _ref4[0];

        return tag.$relatedQuery('articles').offset(offset).limit(limit);
      });
    },
  }, {
    key: 'getArticleById',
    value: function getArticleById(id) {
      return Article.query().where({ id }).then((x) => {
        return x[0];
      });
    },
  }, {
    key: 'getArticleBySlug',
    value: function getArticleBySlug(slug) {
      return Article.query().where({ slug }).then((x) => {
        return x[0];
      });
    },
  }]);
  return Article;
}(_objection.Model));

Article.tableName = 'articles';
Article.jsonSchema = {
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
};
Article.relationMappings = {
  user: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: `${__dirname}/User`,
    join: {
      from: 'articles.userId',
      to: 'users.id',
    },
  },

  comments: {
    relation: _objection.Model.HasManyRelation,
    modelClass: `${__dirname}/Comment`,
    join: {
      from: 'articles.id',
      to: 'comments.articleId',
    },
  },

  tags: {
    relation: _objection.Model.ManyToManyRelation,
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
};
exports.default = Article;
