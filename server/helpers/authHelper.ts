import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

interface IDecoded {
    userId: string,
    iat: number,
    exp: number
}

const createToken = (userId: string) : string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}   
        
const createAndSendToken = (userId: string, res: express.Response, statusCode: number, message: string) : void => {
    const token = createToken(userId)

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
    .status(statusCode)
    .json({
        message,
        token
    })
}   

const verifyToken = (token: string) : IDecoded  => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IDecoded
    
    return decoded
}
    
const encryptResetToken = (token: string) : string => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

export { createToken, createAndSendToken, verifyToken, encryptResetToken }