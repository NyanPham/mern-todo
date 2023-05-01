import express from 'express'
import crypto from 'crypto'
import User from '../models/User'
import { IGetUserAuthInfoRequest } from '../types/userTypes'
import catchAsync from '../helpers/catchAsync'
import { createAndSendToken, verifyToken } from '../helpers/authHelper'
import sendMail, {  IMailerOptions } from '../helpers/mailSender'

export const register = catchAsync(async (req: express.Request, res: express.Response) => {
    const {
        name,
        email,
        password,
        passwordConfirm,
        location
    } : {        
        name: string,
        email: string,
        password: string,
        passwordConfirm: string,
        location?: string
    } = req.body

    if (password !== passwordConfirm) throw new Error("Passwords do not match")
    if (email == null || password == null || name == null) throw new Error("Please fill in all required fields!")
    
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm
    })  

    newUser.password = undefined

    res.status(201).json({
        status: 'success',
        message: "You have registered successfully!"
    })
})

export const login = catchAsync(async (req: express.Request, res: express.Response) => {
    const {
        email,
        password,
    } : {        
        email: string,
        password: string,
    } = req.body

    if (email == null || password == null) throw new Error("Please fill in all required fields!")
    
    const user = await User.findOne({ email }).select('+password')

    // @ts-ignore
    const correctPassword = await user.comparePassword(password, user.password)

    if (user == null || !correctPassword) throw new Error("Invalid credentials")

    createAndSendToken(user._id.toString(), res, 200, 'Logged in successfully!')
})

export const protect = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let token = null 

        if (req.headers.authorization && req.headers.authorization.includes("Bearer")) {
            token = req.headers.authorization.split("Bearer ")[1]
        } else if (req.cookies.jwt != null) {
            token = req.cookies.jwt
        }

        const { userId, iat } = verifyToken(token)

        const currentUser = await User.findById(userId)

        if (currentUser == null) {
            throw new Error("No user attached with that token. Please login to continue!")
        }

        // @ts-ignore
        if (currentUser.changedPasswordAfter(iat)) {
            throw new Error("Password has been changed. Please login again to continue!")
        }

        // @ts-ignore
        req.currentUser = currentUser

        next()
    } catch (error: any) {
        throw new Error(error)
    }
}

export const restrictTo = (...roles : string[]) => async(req: IGetUserAuthInfoRequest, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.currentUser == null) {
            throw new Error("You have not logged in!")
        }

        if (!roles.includes(req.currentUser.role)) {
            throw new Error("You have no permission!")
        }

        next()
    } catch (error: any) {
        throw new Error(error)
    }
}   

export const updatePassword = catchAsync(async (req: IGetUserAuthInfoRequest , res: express.Response) => {
        // @ts-ignore 
    const { currentPassword, password, passwordConfirm } = req.body

    if (currentPassword == null || password == null || passwordConfirm == null) {
        throw new Error("Please provide required fields")
    }

    const currentUser = await User.findById(req.currentUser._id).select('+password')
        // @ts-ignore
    const correctPassword = await currentUser.comparePassword(currentPassword, currentUser.password)

    if (!currentUser || !correctPassword) {
        throw new Error("Invalid credentials!")
    }   

    if (password !== passwordConfirm) {
        throw new Error("Passwords do not match")
    }

    currentUser.password = password
    currentUser.save()

    res.status(200).json({
        status: 'success',
        message: "Password has been changed successfully!"
    })
})

export const forgotPassword = async (req: express.Request , res: express.Response, next: express.NextFunction) => {
    try {
        const { email } = req.body

        if (email == null) {
            throw new Error("The email is invalid!")
        }

        const user = await User.findOne({ email })

        if (user == null) {
            throw new Error("The email is invalid")
        }

        // @ts-ignore
        const resetToken = user.createResetPasswordToken()
        await user.save()

        const resetUrl = `http://localhost:8000/api/v1/auth/resetPassword/${resetToken}`
        const message = `
            The reset token is only valid within 10 minutes
            Please click this link to continue: ${resetUrl}
        `

        const options : IMailerOptions = {
            from: "phamthanhnhanussh@gmail.com",
            to: email,
            subject: "Reset Password Token",
            message,
        }

        await sendMail(options)

        res.status(250).json({
            status: 'success',
            message: 'Reset password token has been sent to your mail box!'
        })
    } catch (error: any) {
        throw new Error(error)
    }
}

export const resetPassword = async (req: express.Request , res: express.Response, next: express.NextFunction) => {
    try {
        const { resetToken } = req.params
        const { password, passwordConfirm } = req.body
        
        if (resetToken == null || password == null || passwordConfirm == null) {
            throw new Error("Please provide required fields!")
        }

        if (password !== passwordConfirm) {
            throw new Error("Passwords do not match")
        }

        const encryptedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        const user = await User.findOne({
            passwordResetToken: encryptedResetToken,
            passwordResetExpires: {
                $lt: Date.now()
            }
        })

        if (user == null) {
            throw new Error("Token has been expired or invalid!")
        }

        user.password = password
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save()

        res.status(200).json({
            status: 'success',
            message: 'Password has been reset!'
        })
    } catch (error: any) {
        throw new Error(error)
    }
}
