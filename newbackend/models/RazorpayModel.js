"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RazorpaySchema = new _mongoose.default.Schema({
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderID: String,
    paymentID: String,
    signature: String
  }
});

const razorpayorder = _mongoose.default.model('razorpayorder', RazorpaySchema);

var _default = razorpayorder;
exports.default = _default;