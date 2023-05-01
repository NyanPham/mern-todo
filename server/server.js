import app from './app.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// setup environment
dotenv.config({ path: './.env.local' })

const dbString = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose
    .connect(dbString)
    .then((res) => {
        console.log('Database is connected successfully!')
        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}!`)
        })
    })
    .catch('Failed to connect to the database')

// run server
