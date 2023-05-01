"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordChangedAfterTokenIssued = exports.createResetPasswordToken = exports.modifyUserAttributes = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
async function hashPassword(next) {
    if (!this.isModified('password'))
        next();
    const passwordWithKey = `${this.password}${process.env.AUTH_PROTECT_KEY}`;
    const hashedPassword = await bcrypt_1.default.hash(passwordWithKey, 12);
    this.password = hashedPassword;
    this.passwordConfirm = undefined;
    next();
}
exports.hashPassword = hashPassword;
async function modifyUserAttributes(next) {
    if (this.isModified(['passwordResetToken', 'passwordResetExpires']))
        next();
    this.updatedAt = new Date();
    if (!this.isModified('password'))
        next();
    this.passwordChangedAt = new Date();
    next();
}
exports.modifyUserAttributes = modifyUserAttributes;
function createResetPasswordToken() {
    const resetToken = crypto_1.default.randomBytes(18).toString('base64');
    this.passwordResetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = new Date();
    return resetToken;
}
exports.createResetPasswordToken = createResetPasswordToken;
function passwordChangedAfterTokenIssued(iat) {
    if (this.passwordChangedAt == null)
        return false;
    const changedTimestamp = new Date(this.passwordChangedAt).getTime() / 1000;
    return changedTimestamp > iat;
}
exports.passwordChangedAfterTokenIssued = passwordChangedAfterTokenIssued;
//# sourceMappingURL=userMiddlewares.js.map