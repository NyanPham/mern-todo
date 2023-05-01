import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'

import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'
import taskRouter from './routes/taskRouter'
import meRouter from './routes/meRouter'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(compression())
    
app.use(cors({
    origin: 'http:localhost:3000'
}))

app.options('*', cors({
    origin: 'http:localhost:3000'
}))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/me', meRouter)
app.use('/api/v1/tasks', taskRouter)

export default app
