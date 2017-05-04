

const _regenerator = require('babel-runtime/regenerator');

const _regenerator2 = _interopRequireDefault(_regenerator);

const _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

const _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

const _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

const _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

const _passport = require('passport');

const _passport2 = _interopRequireDefault(_passport);

const _passportLocal = require('passport-local');

const _passportLocal2 = _interopRequireDefault(_passportLocal);

const _User = require('./models/User');

const _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.serializeUser((user, cb) => {
  console.log('passport serializeUser', user);

  cb(null, user.id);
});

_passport2.default.deserializeUser(function () {
  const _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id, cb) {
    let user;
    return _regenerator2.default.wrap((_context) => {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('passport deserializeUser', id);

            // TODO: use DB layer to get user.

            _context.prev = 1;
            _context.next = 4;
            return _User2.default.query().where({ id }).then((_ref2) => {
              let _ref3 = (0, _slicedToArray3.default)(_ref2, 1),
                x = _ref3[0];

              return x;
            });

          case 4:
            user = _context.sent;


            console.log('passport deserializeUser user', id, user);

            if (!user) {
              cb(new Error('Not Found'));
            }

            cb(null, user.toJSON());
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context.catch(1);

            cb(_context.t0);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

_passport2.default.use(new _passportLocal2.default(function () {
  const _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(email, password, cb) {
    let _ref5,
      _ref6,
      user;

    return _regenerator2.default.wrap((_context2) => {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('passport LocalStrategy', email, password);

            _context2.prev = 1;
            _context2.next = 4;
            return _User2.default.query().where({ email, password });

          case 4:
            _ref5 = _context2.sent;
            _ref6 = (0, _slicedToArray3.default)(_ref5, 1);
            user = _ref6[0];


            cb(null, user.toJSON());
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2.catch(1);

            cb(_context2.t0);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 10]]);
  }));

  return function (_x3, _x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}()));
