"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _razorpay = _interopRequireDefault(require("razorpay"));

var _RazorpayModel = _interopRequireDefault(require("../models/RazorpayModel"));

var _OrderModel = _interopRequireDefault(require("../models/OrderModel"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const razorpayrouter = _express.default.Router();

razorpayrouter.get('/get-razorpay-key', (req, res) => {
  res.send({
    key: _config.default.Razorpay_KEY_ID
  });
});
razorpayrouter.post('/create-order', (0, _expressAsyncHandler.default)(async (req, res) => {
  try {
    var instance = new _razorpay.default({
      key_id: _config.default.Razorpay_KEY_ID,
      key_secret: _config.default.Razorpay_KEY_SECRET
    });
    var order = await instance.orders.create({
      amount: req.body.amount,
      currency: "INR"
    });
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
}));
razorpayrouter.post('/pay-order/:id', _utils.isAuth, async (req, res) => {
  try {
    const {
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature
    } = req.body;
    const newpayment = (0, _RazorpayModel.default)({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderID: razorpayOrderId,
        paymentID: razorpayPaymentId,
        signature: razorpaySignature
      }
    });
    await newpayment.save();
    const order = await _OrderModel.default.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updateOrder = await order.save();
      res.send({
        message: "order delivered",
        order: updateOrder
      });
    } else {
      res.status(404).send({
        message: "Order not found"
      });
    }

    res.send({
      message: 'Payment Sucessful'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
var _default = razorpayrouter;
exports.default = _default;