import express from 'express'
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

const app = express()

// Security configuration
app.use(helmet())
app.use(cors({
    origin: 'http:localhost:3000'
}))
app.options('*', cors({
    origin: 'http:localhost:3000'
}))
const limiter = rateLimit({
	max: 300,
    windowMs: 60 * 24 * 60 * 1000,
    message: "You have reached the access quota limit of 300. Please wait for quota to reset"
})
app.use(limiter)
app.use(xss())
app.use(mongoSanitize())


// Data transfer congiruation
app.use(bodyParser.json({
    limit: '30kbs'
}))
app.use(express.json())
app.use(cookieParser())
app.use(compression())

// Route dispatcher
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/me', meRouter)
app.use('/api/v1/tasks', taskRouter)

export default app
