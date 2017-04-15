'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _layout = require('../components/layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function () {
  return _react2.default.createElement(_layout2.default, null, 'Hello world', _react2.default.createElement('p', null, 'scoped!'), _react2.default.createElement('style', { jsx: true }, '\n      p {\n        color: blue;\n      }\n      div {\n        background: #99CCFF;\n      }\n    '));
};