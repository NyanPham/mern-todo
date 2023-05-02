import express from 'express'
import crypto from 'crypto'
import User from '../models/User'
import { IGetUserAuthInfoRequest, IUser, IUserForClient } from '../types/userTypes'
import catchAsync from '../helpers/catchAsync'
import { createAndSendToken, verifyToken } from '../helpers/authHelper'
import sendMail, {  IMailerOptions } from '../helpers/mailSender'
import AppError from '../errors/AppError'

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
    
    if (email == null || password == null || name == null || passwordConfirm == null) throw new AppError("Please fill in all required fields!", 400)
    if (password !== passwordConfirm) throw new AppError("Passwords do not match", 400)

    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm
    })  
    
    newUser.password = undefined

    const userForClient : IUserForClient = {
        userId: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        imageSrc: newUser.imageSrc,
        favorites: newUser.favorites.map(id => id.toString()) || [],
        location: newUser.location || null,
        tasks: newUser.tasks || []
    } 
        
    createAndSendToken(newUser._id.toString(), res, { 
        statusCode: 201, 
        message: 'You have registered successfully!',
        currentUser: userForClient
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

    if (email == null || password == null) throw new AppError("Please fill in all required fields!", 400)
    
    const user = await User.findOne({ email }).select('+password')

    // @ts-ignore
    const correctPassword = await user.comparePassword(password, user.password)

    if (user == null || !correctPassword) throw new AppError("Invalid credentials", 400)
    
    const userForClient : IUserForClient = {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        imageSrc: user.imageSrc,
        favorites: user.favorites.map(id => id.toString()) || undefined,
        location: user.location || null,
        tasks: user.tasks || []
    }

    createAndSendToken(user._id.toString(), res, { 
        statusCode: 200, 
        message: 'Logged in successfully!',
        currentUser: userForClient
    })
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
            throw new AppError("No user attached with that token. Please login to continue!", 400)
        }
        
        // @ts-ignore
        if (currentUser.changedPasswordAfter(iat)) {
            throw new AppError("Password has been changed. Please login again to continue!", 403)
        }

        // @ts-ignore
        req.currentUser = currentUser

        next()
    } catch (error: any) {
        next(new Error(error))
    }
}

export const restrictTo = (...roles : string[]) => async(req: IGetUserAuthInfoRequest, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.currentUser == null) {
            next(new AppError("You have not logged in!", 400))
        }

        if (!roles.includes(req.currentUser.role)) {
            next(new AppError("You have no permission!", 403))
        }

        next()
    } catch (error: any) {
        next(new Error(error))
    }
}   

export const updatePassword = catchAsync(async (req: IGetUserAuthInfoRequest , res: express.Response) => {
        // @ts-ignore 
    const { currentPassword, password, passwordConfirm } = req.body

    if (currentPassword == null || password == null || passwordConfirm == null) {
        throw new AppError("Please provide required fields", 400)
    }

    const currentUser = await User.findById(req.currentUser._id).select('+password')
        // @ts-ignore
    const correctPassword = await currentUser.comparePassword(currentPassword, currentUser.password)

    if (!currentUser || !correctPassword) {
        throw new AppError("Invalid credentials!", 400)
    }   

    if (password !== passwordConfirm) {
        throw new AppError("Passwords do not match", 400)
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
            next(new AppError("The email is invalid!", 400))
        }

        const user = await User.findOne({ email })

        if (user == null) {
            next(new AppError("The email is invalid", 400))
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
        next(new Error(error))
    }
}   

export const resetPassword = async (req: express.Request , res: express.Response, next: express.NextFunction) => {
    try {
        const { resetToken } = req.params
        const { password, passwordConfirm } = req.body
        
        if (resetToken == null || password == null || passwordConfirm == null) {
            next(new AppError("Please provide required fields!", 400))
        }

        if (password !== passwordConfirm) {
            next(new AppError("Passwords do not match", 400))
        }

        const encryptedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        const user = await User.findOne({
            passwordResetToken: encryptedResetToken,
            passwordResetExpires: {
                $lt: Date.now()
            }
        })

        if (user == null) {
            next(new AppError("Token has been expired or invalid!", 400))
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
        next(new Error(error))
    }
}
