import catchAsync from "../helpers/catchAsync"
import express from 'express'
import { IGetUserAuthInfoRequest } from "../types/userTypes"

interface ITaskCreate {
    isAuthBased?: boolean | null,
    field?: string | null
}

export const getAll = (Model : Record<string, any>, filterOptions: object | null = {}) => catchAsync(async (req: IGetUserAuthInfoRequest , res: express.Response) => {
    const data = await Model.find(filterOptions)
    
    res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
            data
        }
    })
})

export const createOne = (Model : Record<string, any>, options?: ITaskCreate) => catchAsync(async(req: IGetUserAuthInfoRequest , res: express.Response) => {
    let content = {...req.body}

    if (options && options.isAuthBased && options.field) {
        content = {
            ...content,
            [options.field]: req.currentUser._id
        }   
    }

    const data = await Model.create(content)

   
    res.status(201).json({
        status: 'success',
        data: {
            data
        }
    })
})  

export const getOne = (Model: Record<string, any>, populateOptions? : object) => catchAsync(async (req: IGetUserAuthInfoRequest , res: express.Response) => {
    //@ts-ignore
    const { id } = req.params

    const query = Model.findById(id)
    if (populateOptions) {
        query.populate(populateOptions)
    }

    const data = await query.exec()

    if (data ==null) throw new Error(`${Model} is not defined`)

    res.status(200).json({
        status: 'success',
        data: {
            data
        }
    })
}) 

export const updateOne = (Model : Record<string, any>, unallowedFields? : string[] | null) => catchAsync(async (req: IGetUserAuthInfoRequest , res: express.Response) => {
    const content = {...req.body}
    const contentKeys = Object.keys(content)

    if (unallowedFields && unallowedFields.some(field => contentKeys.includes(field))) {
        throw new Error(`Fields of ${unallowedFields.join(', ')} cannot be updated`)
    }

    // @ts-ignore
    const { id } = req.params
    const updatedData = await Model.findByIdAndUpdate(id, content, {
        runValidators: true,
        new: true,
    })

    if (updatedData == null) throw new Error(`Failed to update ${Model}`)

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedData
        }
    })
})

export const deleteOne = (Model: Record<string, any>) => catchAsync(async (req: express.Request , res: express.Response) => {
    const { id } = req.params 

    await Model.findByIdAndDelete(id)

    res.status(204).json({
        status: 'success',
        data: null
    })
})