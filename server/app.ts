import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
/*@ts-ignore */
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'
import taskRouter from './routes/taskRouter'
import meRouter from './routes/meRouter'
import categoryRouter from './routes/categoryRouter'

import errorController from './controllers/errorController'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// Security configuration
app.use(helmet())
app.use(
    cors({
        origin: ['https://nyan-todo.vercel.app'],
        credentials: true,
    })
)
app.options(
    '*',
    cors({
        origin: ['https://nyan-todo.vercel.app'],
        credentials: true,
    })
)

app.options('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://nyan-todo.vercel.app')
    next()
})

const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 24 * 60 * 1000,
    message: 'You have reached the access quota limit of 300. Please wait for quota to reset',
})
app.use(limiter)
app.use(xss())
app.use(mongoSanitize())

// Data transfer congiruation
app.use(
    bodyParser.json({
        limit: '10mb',
    })
)
app.use(
    bodyParser.urlencoded({
        limit: '10mb',
    })
)
app.use(
    express.json({
        limit: '10mb',
    })
)

app.use(cookieParser())
app.use(compression())

// Route dispatcher
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/me', meRouter)
app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/categories', categoryRouter)

app.use('*', errorController)

export default app
