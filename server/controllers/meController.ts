import User from '../models/User'
import Task from '../models/Task'
import catchAsync from '../helpers/catchAsync'
import { Response } from 'express'
import { IGetUserAuthInfoRequest } from '../types/userTypes'
import { createMy, deleteMy, getAllMy, getMy, updateMy } from './factoryController'
import Category from '../models/Category'

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
