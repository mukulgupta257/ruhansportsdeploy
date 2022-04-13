"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = exports.isAdmin = exports.generateToken = void 0;

var _config = _interopRequireDefault(require("./config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateToken = user => {
  return _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, _config.default.JWT_SECRET);
};

exports.generateToken = generateToken;

const isAuth = (req, res, next) => {
  const bearertoken = req.headers.authorization;

  if (!bearertoken) {
    res.status(401).send({
      message: "Token Not Supplied"
    });
  } else {
    const token = bearertoken.slice(7, bearertoken.length);

    _jsonwebtoken.default.verify(token, _config.default.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({
          message: "Invalid Token"
        });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

exports.isAuth = isAuth;

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({
      message: "Token not valid for admin user"
    });
  }
};

exports.isAdmin = isAdmin;