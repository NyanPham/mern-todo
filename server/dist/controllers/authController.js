'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.resetPassword =
    exports.forgotPassword =
    exports.updatePassword =
    exports.restrictTo =
    exports.protect =
    exports.login =
    exports.register =
        void 0
const crypto_1 = __importDefault(require('crypto'))
const User_1 = __importDefault(require('../models/User'))
const catchAsync_1 = __importDefault(require('../helpers/catchAsync'))
const authHelper_1 = require('../helpers/authHelper')
const mailSender_1 = __importDefault(require('../helpers/mailSender'))
exports.register = (0, catchAsync_1.default)(async (req, res) => {
    const { name, email, password, passwordConfirm, location } = req.body
    if (password !== passwordConfirm) throw new AppError('Passwords do not match')
    if (email == null || password == null || name == null) throw new AppError('Please fill in all required fields!')
    const newUser = await User_1.default.create({
        name,
        email,
        password,
        passwordConfirm,
    })
    newUser.password = undefined
    res.status(201).json({
        status: 'success',
        message: 'You have registered successfully!',
    })
})
exports.login = (0, catchAsync_1.default)(async (req, res) => {
    const { email, password } = req.body
    if (email == null || password == null) throw new AppError('Please fill in all required fields!')
    const user = await User_1.default.findOne({ email }).select('+password')
    // @ts-ignore
    const correctPassword = await user.comparePassword(password, user.password)
    if (user == null || !correctPassword) throw new AppError('Invalid credentials')
    ;(0, authHelper_1.createAndSendToken)(user._id.toString(), res, 200, 'Logged in successfully!')
})
const protect = async (req, res, next) => {
    try {
        let token = null
        if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
            token = req.headers.authorization.split('Bearer ')[1]
        } else if (req.cookies.jwt != null) {
            token = req.cookies.jwt
        }
        const { userId, iat } = (0, authHelper_1.verifyToken)(token)
        const currentUser = await User_1.default.findById(userId)
        if (currentUser == null) {
            throw new AppError('No user attached with that token. Please login to continue!')
        }
        // @ts-ignore
        if (currentUser.changedPasswordAfter(iat)) {
            throw new AppError('Password has been changed. Please login again to continue!')
        }
        // @ts-ignore
        req.currentUser = currentUser
        next()
    } catch (error) {
        throw new AppError(error)
    }
}
exports.protect = protect
const restrictTo =
    (...roles) =>
    async (req, res, next) => {
        try {
            if (req.currentUser == null) {
                throw new AppError('You have not logged in!')
            }
            if (!roles.includes(req.currentUser.role)) {
                throw new AppError('You have no permission!')
            }
            next()
        } catch (error) {
            throw new AppError(error)
        }
    }
exports.restrictTo = restrictTo
exports.updatePassword = (0, catchAsync_1.default)(async (req, res) => {
    // @ts-ignore
    const { currentPassword, password, passwordConfirm } = req.body
    if (currentPassword == null || password == null || passwordConfirm == null) {
        throw new AppError('Please provide required fields')
    }
    const currentUser = await User_1.default.findById(req.currentUser._id).select('+password')
    // @ts-ignore
    const correctPassword = await currentUser.comparePassword(currentPassword, currentUser.password)
    if (!currentUser || !correctPassword) {
        throw new AppError('Invalid credentials!')
    }
    if (password !== passwordConfirm) {
        throw new AppError('Passwords do not match')
    }
    currentUser.password = password
    currentUser.save()
    res.status(200).json({
        status: 'success',
        message: 'Password has been changed successfully!',
    })
})
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        if (email == null) {
            throw new AppError('The email is invalid!')
        }
        const user = await User_1.default.findOne({ email })
        if (user == null) {
            throw new AppError('The email is invalid')
        }
        // @ts-ignore
        const resetToken = user.createResetPasswordToken()
        await user.save()
        const resetUrl = `http://localhost:8000/api/v1/auth/resetPassword/${resetToken}`
        const message = `
            The reset token is only valid within 10 minutes
            Please click this link to continue: ${resetUrl}
        `
        const options = {
            from: 'phamthanhnhanussh@gmail.com',
            to: email,
            subject: 'Reset Password Token',
            message,
        }
        await (0, mailSender_1.default)(options)
        res.status(250).json({
            status: 'success',
            message: 'Reset password token has been sent to your mail box!',
        })
    } catch (error) {
        throw new AppError(error)
    }
}
exports.forgotPassword = forgotPassword
const resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params
        const { password, passwordConfirm } = req.body
        if (resetToken == null || password == null || passwordConfirm == null) {
            throw new AppError('Please provide required fields!')
        }
        if (password !== passwordConfirm) {
            throw new AppError('Passwords do not match')
        }
        const encryptedResetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex')
        const user = await User_1.default.findOne({
            passwordResetToken: encryptedResetToken,
            passwordResetExpires: {
                $lt: Date.now(),
            },
        })
        if (user == null) {
            throw new AppError('Token has been expired or invalid!')
        }
        user.password = password
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()
        res.status(200).json({
            status: 'success',
            message: 'Password has been reset!',
        })
    } catch (error) {
        throw new AppError(error)
    }
}
exports.resetPassword = resetPassword
//# sourceMappingURL=authController.js.map
