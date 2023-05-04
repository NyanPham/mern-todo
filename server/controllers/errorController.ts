import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

const handleDupliateErrorDB = (error: AppError): AppError => {
    const message = `These inputs are duplicated: ${Object.keys(error.keyValue).join(', ')}`
    return new AppError(message, 400)
}

const handleValidationErrorDB = (err: AppError): AppError => {
    const message = `${Object.values(err.errors).join(', ')}`
    return new AppError(message, 400)
}

const handleErrorPro = (error: AppError, res: Response) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        })
    }

    res.status(500).json({
        status: 'error',
        message: 'Oop! Something went really wrong...',
    })
}

const handleErrorDev = (error: AppError, res: Response) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            error: error,
            message: error.message,
            trace: error.trace,
        })
    }

    res.status(500).json({
        status: 'error',
        message: 'Oop! Something went really wrong...',
        error: error,
    })
}

const errorController = async (error: AppError, req: Request, res: Response, next: NextFunction) => {
    // console.log(error)

    if (process.env.NODE_ENV === 'development') {
        handleErrorDev(error, res)
    } else {
        let err = { ...error }
        err.message = error.message
        err.code = error.code
        err.name = error.name

        if (error.code === 11000) {
            err = handleDupliateErrorDB(err)
        }

        if (error.name === 'ValidationError') {
            err = handleValidationErrorDB(err)
        }

        handleErrorPro(err, res)
    }
}

export default errorController
