import app from './app'
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
    .catch((error: any) => console.log( 'Failed to connect to the database'))

// run server
