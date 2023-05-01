import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import userRouter from './routes/userRouter'
    ``
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(compression())

app.use('/api/v1/users', userRouter)

export default app
