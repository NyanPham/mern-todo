class AppError extends Error {
    message: string
    statusCode: number
    status: string
    isOperational?: boolean
    trace?: any
    code?: number
    keyValue?: any
    errors?: any

    constructor(message: string, statusCode: number) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError