import User from "../models/User"
import Task from "../models/Task"
import catchAsync from "../helpers/catchAsync"
import { Response } from "express"
import { IGetUserAuthInfoRequest, ITaskToUpdate } from "../types/userTypes"

export const getMyTasks = catchAsync(async(req: IGetUserAuthInfoRequest, res: Response) => {
    const tasks = await Task.find({
        userId: req.currentUser._id
    })

    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: {
            data: tasks
        }
    })
})
export const createMyTask = catchAsync(async(req: IGetUserAuthInfoRequest, res: Response) => {
    const taskToCreate = {
        ...req.body,
        userId: req.currentUser._id
    }

    const task = await Task.create(taskToCreate)
    res.status(201).json({
        status: 'success',
        data: {
            data: task
        }
    })
})
export const getMyTask = catchAsync(async(req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params 

    const task = await Task.findOne({
        _id: id,
        userId: req.currentUser._id
    })

    if (task == null) throw new Error("No task found!")

    res.status(200).json({
        status: 'success',
        data: {
            data: task
        }
    })  
})
export const updateMyTask = catchAsync(async(req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params   

    const taskToUpdate = {...req.body} as ITaskToUpdate

    if (taskToUpdate.userId != null) {
        delete taskToUpdate.userId
    }

    console.log(taskToUpdate)

    const updatedTask = await Task.findOneAndUpdate({
        _id: id,
        userId: req.currentUser._id
    }, taskToUpdate, {
        runValidators: true,
        new: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedTask
        }
    })
})
export const deleteMyTask = catchAsync(async(req: IGetUserAuthInfoRequest, res: Response) => {
    await Task.findOneAndDelete({
        _id: req.params.id,
        userId: req.currentUser._id
    })

    res.status(204).json({
        status: 'success',
        data: null
    })
})
    
export const deactivateMyAccount = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
    await User.findByIdAndUpdate(req.currentUser._id, {
        active: false
    }, {
        runValidators: true,
        new: true
    })

    res.status(204).json({
        status: 'success',
        data: null
    })
})