import User from '../models/User'
import Task from '../models/Task'
import catchAsync from '../helpers/catchAsync'
import { Response, Request, NextFunction } from 'express'
import {
    IAllowedUpdateAccRequest,
    IGetUserAuthInfoRequest,
    IMulterFile,
    IUnallowedUpdateAccRequest,
} from '../types/userTypes'
import { createMy, deleteMy, getAllMy, getMy, updateMy } from './factoryController'
import Category from '../models/Category'
import AppError from '../errors/AppError'

export const getMyTasks = getAllMy(Task)
export const createMyTask = createMy(Task)
export const getMyTask = getMy(Task)
export const updateMyTask = updateMy(Task)
export const deleteMyTask = deleteMy(Task)

export const getMyCategories = getAllMy(Category)
export const createMyCategory = createMy(Category)
export const getMyCategory = getMy(Category)
export const updateMyCategory = updateMy(Category)
export const deleteMyCategory = deleteMy(Category)

export const getMyAccount = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.currentUser._id)

    res.status(200).json({
        status: 'success',
        data: {
            data: user,
        },
    })
})

export const updateMyAccount = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    let reqBody = { ...req.body } as IUnallowedUpdateAccRequest
    if (reqBody.password || reqBody.passwordConfirm) throw new AppError('You cannot change your password here', 400)

    let allowedBody = { ...req.body } as IAllowedUpdateAccRequest
    let bodyToUpdate: IAllowedUpdateAccRequest = {}

    if (allowedBody.name) bodyToUpdate.name = allowedBody.name
    if (allowedBody.email) bodyToUpdate.email = allowedBody.email
    if (allowedBody.imageSrc) bodyToUpdate.imageSrc = allowedBody.imageSrc
    if (req.file) bodyToUpdate.imageSrc = (req.file as IMulterFile).filename

    const updatedUser = await User.findByIdAndUpdate(req.currentUser._id, bodyToUpdate, {
        runValidators: true,
        new: true,
    })

    if (!updatedUser) return new AppError('Failed to update account!', 400)

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedUser,
        },
    })
})

export const deactivateMyAccount = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
    await User.findByIdAndUpdate(
        req.currentUser._id,
        {
            active: false,
        },
        {
            runValidators: true,
            new: true,
        }
    )

    res.status(204).json({
        status: 'success',
        data: null,
    })
})
