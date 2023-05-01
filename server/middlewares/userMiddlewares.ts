import express from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export async function hashPassword(next : express.NextFunction) {
    if (!this.isModified('password')) next()
    
    const passwordWithKey = `${this.password}${process.env.AUTH_PROTECT_KEY}`

    const hashedPassword = await bcrypt.hash(passwordWithKey, 12)
    this.password = hashedPassword
    this.passwordConfirm = undefined

    next()
}

export async function modifyUserAttributes(next : express.NextFunction) {
    if (this.isModified(['passwordResetToken', 'passwordResetExpires'])) next()

    this.updatedAt = new Date()
    if (!this.isModified('password')) next()

    this.passwordChangedAt = new Date()
    next()  
}
    
export function createResetPasswordToken() {
    const resetToken = crypto.randomBytes(18).toString('base64')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = new Date()

    return resetToken
}   

export function passwordChangedAfterTokenIssued(iat: number) : boolean {
    if (this.passwordChangedAt == null) return false

    const changedTimestamp = new Date(this.passwordChangedAt).getTime() / 1000
    return changedTimestamp > iat
}