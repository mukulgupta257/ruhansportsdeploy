"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _queryModel = _interopRequireDefault(require("../models/queryModel"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryRouter = _express.default.Router();

queryRouter.get('/getquery/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const queries = await _queryModel.default.findById(req.params.id);
  res.send(queries);
}));
queryRouter.post('/createquery', (0, _expressAsyncHandler.default)(async (req, res) => {
  const createquery = new _queryModel.default({
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    subject: req.body.subject,
    message: req.body.message
  });
  const createdQuery = await createquery.save();

  if (!createdQuery) {
    res.status(401).send({
      message: "Invalid Query data"
    });
  } else {
    res.send({
      _id: createdQuery._id,
      name: createdQuery.name,
      email: createdQuery.email,
      phonenumber: createdQuery.phonenumber,
      subject: createdQuery.subject,
      message: createdQuery.message
    });
  }
}));
queryRouter.get('/getquery', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const queries = await _queryModel.default.find({});
  res.send(queries);
}));
queryRouter.delete('/delete/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const queries = await _queryModel.default.findById(req.params.id);

  if (queries) {
    const deltequery = await queries.remove();
    res.send({
      message: "query deleted sucessfuly",
      query: deltequery
    });
  } else {
    res.status(404).send({
      message: "query not found"
    });
  }
}));
var _default = queryRouter;
exports.default = _default;