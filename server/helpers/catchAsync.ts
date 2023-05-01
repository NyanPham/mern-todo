import express from 'express'
    
const catchAsync = (func: Function) => 
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await func(req, res)
        } catch (error: any) {
            next(error)
        }
    }

export default catchAsync