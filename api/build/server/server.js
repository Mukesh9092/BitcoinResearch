

const _regenerator = require('babel-runtime/regenerator');

const _regenerator2 = _interopRequireDefault(_regenerator);

const _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

const _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

const start = (function () {
  const _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap((_context) => {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            // log.info('Running migrations...')
            //
            // await db.migrate.latest()
            //
            // log.info('Migrations complete.')
            //
            // log.info('Running seed...')
            //
            // await db.seed.run()
            //
            // log.info('Seed complete.')

            _loglevel2.default.info('Starting HTTP Server...');

            _context.next = 4;
            return app.listen(PORT, HOSTNAME);

          case 4:

            _loglevel2.default.info(`HTTP Server listening at http://${HOSTNAME}:${PORT}`);
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context.catch(0);

            _loglevel2.default.error(_context.t0);
            process.exit();

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}());

const _path = require('path');

const _path2 = _interopRequireDefault(_path);

const _zlib = require('zlib');

const _zlib2 = _interopRequireDefault(_zlib);

const _koa = require('koa');

const _koa2 = _interopRequireDefault(_koa);

const _graphqlTools = require('graphql-tools');

const _koaBodyparser = require('koa-bodyparser');

const _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

const _koaCompress = require('koa-compress');

const _koaCompress2 = _interopRequireDefault(_koaCompress);

const _koaConvert = require('koa-convert');

const _koaConvert2 = _interopRequireDefault(_koaConvert);

const _koaErrorhandler = require('koa-errorhandler');

const _koaErrorhandler2 = _interopRequireDefault(_koaErrorhandler);

const _koaGraphql = require('koa-graphql');

const _koaGraphql2 = _interopRequireDefault(_koaGraphql);

const _koaHelmet = require('koa-helmet');

const _koaHelmet2 = _interopRequireDefault(_koaHelmet);

const _koaLogger = require('koa-logger');

const _koaLogger2 = _interopRequireDefault(_koaLogger);

const _koaPassport = require('koa-passport');

const _koaPassport2 = _interopRequireDefault(_koaPassport);

const _koaPing = require('koa-ping');

const _koaPing2 = _interopRequireDefault(_koaPing);

const _koaResponseTime = require('koa-response-time');

const _koaResponseTime2 = _interopRequireDefault(_koaResponseTime);

const _koaRouter = require('koa-router');

const _koaRouter2 = _interopRequireDefault(_koaRouter);

const _koaGenericSession = require('koa-generic-session');

const _koaGenericSession2 = _interopRequireDefault(_koaGenericSession);

const _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

const _database = require('./database');

const _database2 = _interopRequireDefault(_database);

const _resolvers = require('./graphql/resolvers');

const _resolvers2 = _interopRequireDefault(_resolvers);

const _schema = require('./graphql/schema');

const _schema2 = _interopRequireDefault(_schema);

require('./authentication');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import koaStatic from 'koa-static'

// Import this first.
const NODE_ENV = process.env.NODE_ENV;


if (NODE_ENV === 'develop') {
  _loglevel2.default.setLevel('debug');
}

var HOSTNAME = process.env.IP || '0.0.0.0';
var PORT = process.env.PORT || 3000;
// const CWD = path.resolve(__dirname)
// const ADDRESS = `http://${HOSTNAME}:${PORT}`

const router = (0, _koaRouter2.default)();
var app = new _koa2.default();
app.keys = ['keyboardcat'];

// Hook to convert old Koa.js middleware
const oldUse = app.use;
app.use = function (x) {
  return oldUse.call(app, (0, _koaConvert2.default)(x));
};

const db = (0, _database2.default)();

router.all('/graphql', (0, _koaConvert2.default)((0, _koaGraphql2.default)({
  schema: (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: _schema2.default,
    resolvers: _resolvers2.default,
  }),
  graphiql: true,
})));

app.use((0, _koaLogger2.default)()).use((0, _koaErrorhandler2.default)()).use((0, _koaHelmet2.default)()).use((0, _koaResponseTime2.default)()).use((0, _koaCompress2.default)({
  filter: function filter(contentType) {
    return (/text/i.test(contentType)
    );
  },
  threshold: 2048,
  flush: _zlib2.default.Z_SYNC_FLUSH,
})).use((0, _koaPing2.default)()).use((0, _koaBodyparser2.default)()).use((0, _koaGenericSession2.default)()).use(_koaPassport2.default.initialize()).use(_koaPassport2.default.session())

// .use(koaStatic(`${CWD}/../client`))

.use(router.routes()).use(router.allowedMethods());

start();
