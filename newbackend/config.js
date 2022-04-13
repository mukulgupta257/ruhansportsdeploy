"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var _default = {
  PORT: process.env.port || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  mail_auth: process.env.mail_auth,
  Razorpay_KEY_ID: process.env.Razorpay_KEY_ID,
  Razorpay_KEY_SECRET: process.env.Razorpay_KEY_SECRET
};
exports.default = _default;