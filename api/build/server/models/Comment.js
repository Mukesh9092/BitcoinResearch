

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Comment = (function (_Model) {
  (0, _inherits3.default)(Comment, _Model);

  function Comment() {
    (0, _classCallCheck3.default)(this, Comment);
    return (0, _possibleConstructorReturn3.default)(this, (Comment.__proto__ || (0, _getPrototypeOf2.default)(Comment)).apply(this, arguments));
  }

  (0, _createClass3.default)(Comment, null, [{
    key: 'getCommentsByUserId',
    value: function getCommentsByUserId(userId) {
      return Comment.query().where({ userId });
    },
  }]);
  return Comment;
}(_objection.Model));

Comment.tableName = 'comments';
Comment.jsonSchema = {
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
};
Comment.relationMappings = {
  article: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: `${__dirname}/Article`,
    join: {
      from: 'comments.articleId',
      to: 'articles.id',
    },
  },

  user: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: `${__dirname}/User`,
    join: {
      from: 'comments.userId',
      to: 'users.id',
    },
  },
};
exports.default = Comment;
