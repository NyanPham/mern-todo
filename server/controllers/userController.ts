import User from "../models/User"
import express from 'express'

export const  getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const users = await User.find()

        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        })
    } catch (error: any) {
        next(error)
    }
}   

export const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
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

        if (password !== passwordConfirm) return next("Passwords do not match")
        if (email == null || password == null || name == null) return next("Please fill in all required fields!")

        const newUser = await User.create({
            name,
            email,
            password,
            passwordConfirm
        })
        
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (error) {
        next(error)
    }
}