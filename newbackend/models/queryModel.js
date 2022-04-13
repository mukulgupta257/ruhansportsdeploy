"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const querySchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true,
    default: "Query regarding Sports Ground"
  },
  message: {
    type: String,
    required: true
  }
});

const query = _mongoose.default.model('query', querySchema);

var _default = query;
exports.default = _default;