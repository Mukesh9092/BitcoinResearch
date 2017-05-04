

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

const Tag = (function (_Model) {
  (0, _inherits3.default)(Tag, _Model);

  function Tag() {
    (0, _classCallCheck3.default)(this, Tag);
    return (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tag, null, [{
    key: 'getTags',
    value: function getTags() {
      return Tag.query();
    },
  }]);
  return Tag;
}(_objection.Model));

Tag.tableName = 'tags';
Tag.jsonSchema = {
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
};
Tag.relationMappings = {
  articles: {
    relation: _objection.Model.ManyToManyRelation,
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
};
exports.default = Tag;
