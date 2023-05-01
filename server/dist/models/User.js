"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userMiddlewares_1 = require("../middlewares/userMiddlewares");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (confirmString) {
                return confirmString === this.password;
            },
            message: 'Passwords do not match!'
        }
    },
    favorites: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Task'
        }],
    role: {
        type: String,
        default: "user"
    },
    location: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
userSchema.methods.comparePassword = async function (candiatePassword, password) {
    return await bcrypt_1.default.compare(candiatePassword + process.env.AUTH_PROTECT_KEY, password);
};
// populate tasks
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'userId'
});
userSchema.methods.changedPasswordAfter = userMiddlewares_1.passwordChangedAfterTokenIssued;
userSchema.methods.createResetPasswordToken = userMiddlewares_1.createResetPasswordToken;
userSchema.pre('save', userMiddlewares_1.hashPassword);
userSchema.pre('save', userMiddlewares_1.modifyUserAttributes);
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map