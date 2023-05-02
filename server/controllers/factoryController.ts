import catchAsync from '../helpers/catchAsync'
import { Request, Response } from 'express'
import { ICategoryToUpdate, IGetUserAuthInfoRequest, ITaskToUpdate } from '../types/userTypes'
import AppError from '../errors/AppError'

interface ITaskCreate {
    isAuthBased?: boolean | null
    field?: string | null
}

// These 5 factory handlers are for general (admin) controllers
export const getAll = (Model: Record<string, any>, filterOptions: object | null = {}) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        const data = await Model.find(filterOptions)

        res.status(200).json({
            status: 'success',
            results: data.length,
            data: {
                data,
            },
        })
    })

export const createOne = (Model: Record<string, any>, options?: ITaskCreate) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        let content = { ...req.body }

        if (options && options.isAuthBased && options.field) {
            content = {
                ...content,
                [options.field]: req.currentUser._id,
            }
        }

        const doc = await Model.create(content)

        res.status(201).json({
            status: 'success',
            data: {
                data: doc,
            },
        })
    })

export const getOne = (Model: Record<string, any>, populateOptions?: object) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        //@ts-ignore
        const { id } = req.params

        const query = Model.findById(id)
        if (populateOptions) {
            query.populate(populateOptions)
        }

        const doc = await query.exec()

        if (doc == null) throw new AppError(`doc is not defined`, 400)

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        })
    })

export const updateOne = (Model: Record<string, any>, unallowedFields?: string[] | null) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        const content = { ...req.body }
        const contentKeys = Object.keys(content)

        if (unallowedFields && unallowedFields.some((field) => contentKeys.includes(field))) {
            throw new AppError(`Fields of ${unallowedFields.join(', ')} cannot be updated`, 400)
        }

        // @ts-ignore
        const { id } = req.params
        const updatedDoc = await Model.findByIdAndUpdate(id, content, {
            runValidators: true,
            new: true,
        })

        if (updatedDoc == null) throw new AppError(`Failed to update doc`, 400)

        res.status(200).json({
            status: 'success',
            data: {
                data: updatedDoc,
            },
        })
    })

export const deleteOne = (Model: Record<string, any>) =>
    catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params

        await Model.findByIdAndDelete(id)

        res.status(204).json({
            status: 'success',
            data: null,
        })
    })

// These next factory handlers are for meRouter, where "user" can only have access to their own data

export const getAllMy = (Model: Record<string, any>) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        const data = await Model.find({
            userId: req.currentUser._id,
        })

        res.status(200).json({
            status: 'success',
            results: data.length,
            data: {
                data: data,
            },
        })
    })

export const createMy = (Model: Record<string, any>) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        const docToCreate = {
            ...req.body,
            userId: req.currentUser._id,
        }

        const doc = await Model.create(docToCreate)

        if (doc == null) throw new AppError('Failed to create doc', 400)

        res.status(201).json({
            status: 'success',
            data: {
                data: doc,
            },
        })
    })

export const getMy = (Model: Record<string, any>) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        const { id } = req.params

        const doc = await Model.findOne({
            _id: id,
            userId: req.currentUser._id,
        })

        if (doc == null) throw new AppError('No doc found!', 400)

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        })
    })

export const updateMy = (Model: Record<string, any>) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        const { id } = req.params

        const docToUpdate = { ...req.body } as ITaskToUpdate | ICategoryToUpdate

        if (docToUpdate.userId != null) {
            delete docToUpdate.userId
        }

        const updatedDoc = await Model.findOneAndUpdate(
            {
                _id: id,
                userId: req.currentUser._id,
            },
            docToUpdate,
            {
                runValidators: true,
                new: true,
            }
        )

        res.status(200).json({
            status: 'success',
            data: {
                data: updatedDoc,
            },
        })
    })

export const deleteMy = (Model: Record<string, any>) =>
    catchAsync(async (req: IGetUserAuthInfoRequest, res: Response) => {
        await Model.findOneAndDelete({
            _id: req.params.id,
            userId: req.currentUser._id,
        })

        res.status(204).json({
            status: 'success',
            data: null,
        })
    })
