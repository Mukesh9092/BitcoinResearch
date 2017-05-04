

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

const User = (function (_Model) {
  (0, _inherits3.default)(User, _Model);

  function User() {
    (0, _classCallCheck3.default)(this, User);
    return (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).apply(this, arguments));
  }

  (0, _createClass3.default)(User, null, [{
    key: 'getUsers',
    value: function getUsers() {
      return User.query();
    },
  }, {
    key: 'getUserById',
    value: function getUserById(id) {
      return User.query().where({ id }).then((x) => {
        return x[0];
      });
    },
  }, {
    key: 'getUserByEmail',
    value: function getUserByEmail(email) {
      return User.query().where({ email }).then((x) => {
        return x[0];
      });
    },
  }, {
    key: 'getUserByUsername',
    value: function getUserByUsername(username) {
      return User.query().where({ username }).then((x) => {
        return x[0];
      });
    },
  }]);
  return User;
}(_objection.Model));

User.tableName = 'users';
User.jsonSchema = {
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
};
User.relationMappings = {
  articles: {
    relation: _objection.Model.HasManyRelation,
    modelClass: `${__dirname}/Article`,
    join: {
      from: 'users.id',
      to: 'articles.userId',
    },
  },

  comments: {
    relation: _objection.Model.HasManyRelation,
    modelClass: `${__dirname}/Comment`,
    join: {
      from: 'users.id',
      to: 'comments.userId',
    },
  },
};
exports.default = User;
