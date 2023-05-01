import catchAsync from "../helpers/catchAsync"
import User from "../models/User"
import {  IUser } from '../types/userTypes'
import express from 'express'

export const getAllUsers = catchAsync(async (req: express.Request, res: express.Response) => {
    const users : IUser[] = await User.find()

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users 
        }
    })
})

export const createUser = catchAsync(async (req: express.Request, res: express.Response) => {
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
        data: {
            user: newUser
        }
    })
})

export const getUser = catchAsync(async (req: express.Request, res: express.Response) => {
    const { id }  = req.params

    const user : IUser = await User.findById(id)

    if (user == null) throw new Error("User is not defined!")

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
})

export const updateUser = catchAsync(async (req: express.Request, res: express.Response) => {
    const { password, passwordConfirm } = req.body

    if (password != null || passwordConfirm != null) throw new Error("Cannot update password. Please change your password!")

    const { id } = req.params 
    const updatedUser : IUser = await User.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    })  

    if (updatedUser == null) throw new Error("Failed to update user")

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})

export const deleteUser = catchAsync(async (req: express.Request, res: express.Response) => {
    const { id } = req.params 

    await User.findByIdAndDelete(id)  

    res.status(204).json({
        status: 'success',
        data: null
    })
})