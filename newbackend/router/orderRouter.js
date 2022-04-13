"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _utils = require("../utils");

var _OrderModel = _interopRequireDefault(require("../models/OrderModel"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = _express.default.Router();

orderRouter.get('/summary', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.aggregate([{
    $group: {
      _id: null,
      numOrders: {
        $sum: 1
      },
      totalprice: {
        $sum: "$totalPrice"
      }
    }
  }]);
  const person = await _userModel.default.aggregate([{
    $group: {
      _id: null,
      numUsers: {
        $sum: 1
      }
    }
  }]);
  res.send({
    user: person,
    order
  });
}));
orderRouter.get('/', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.find({}).populate('user');
  res.send(order);
}));
orderRouter.get('/mine', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _OrderModel.default.find({
    user: req.user._id
  });
  res.send(orders);
}));
orderRouter.get('/:id', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.findById(req.params.id);

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({
      message: "Order Not Found"
    });
  }
}));
orderRouter.post("/", _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = new _OrderModel.default({
    orderItems: req.body.orderitems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.tax,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice
  });
  const createdOrder = await order.save();
  res.status(201).send({
    message: 'New Order Created',
    order: createdOrder
  });
}));
orderRouter.delete('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.findById(req.params.id);

  if (order) {
    const deletedorder = await order.remove();
    res.send({
      message: "Order deleted sucessfuly",
      order: deletedorder
    });
  } else {
    res.status(404).send({
      message: "Order not found"
    });
  }
}));
orderRouter.put('/:id/deliver', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
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
}));
var _default = orderRouter;
exports.default = _default;