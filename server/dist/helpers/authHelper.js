"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptResetToken = exports.verifyToken = exports.createAndSendToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const createToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};
exports.createToken = createToken;
const createAndSendToken = (userId, res, statusCode, message) => {
    const token = createToken(userId);
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
        .status(statusCode)
        .json({
        message,
        token
    });
};
exports.createAndSendToken = createAndSendToken;
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return decoded;
};
exports.verifyToken = verifyToken;
const encryptResetToken = (token) => {
    return crypto_1.default.createHash('sha256').update(token).digest('hex');
};
exports.encryptResetToken = encryptResetToken;
//# sourceMappingURL=authHelper.js.map