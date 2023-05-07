import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { IUserForClient } from '../types/userTypes'

interface IDecoded {
    userId: string
    iat: number
    exp: number
}

interface ITokenResponse {
    statusCode: number
    message: string
    currentUser: IUserForClient
}

const createToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createAndSendToken = (userId: string, res: express.Response, tokenResponse: ITokenResponse): void => {
    const token = createToken(userId)

    const tokenExpires: Date = new Date(Date.now() + 24 * 60 * 60 * 1000)

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: tokenExpires,
        sameSite: 'none',
    })
        .status(tokenResponse.statusCode)
        .json({
            status: 'success',
            message: tokenResponse.message,
            currentUser: { ...tokenResponse.currentUser, authExpiresDate: tokenExpires },
        })
}

const verifyToken = (token: string): IDecoded => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IDecoded

    return decoded
}

const encryptResetToken = (token: string): string => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

export { createToken, createAndSendToken, verifyToken, encryptResetToken }
