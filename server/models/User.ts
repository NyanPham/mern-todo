import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { createResetPasswordToken, hashPassword, modifyUserAttributes, passwordChangedAfterTokenIssued } from '../middlewares/userMiddlewares'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(emailString : string) {
                return new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/).test(emailString)
            },
            message: 'The email address is invalid!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },  
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (confirmString: string){
                return confirmString === this.password
            },  
            message: 'Passwords do not match!'
        }
    },  
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],  
    role: {
        type: String,
        default: "user"
    },
    location: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: {
        type: Date,
    },      
    createdAt: {
        type: Date,
        default: Date.now()
    },  
    updatedAt: {
        type: Date,
        default: Date.now()
    },    
    active: {
        type: Boolean,
        default: true
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

userSchema.methods.comparePassword = async function(candiatePassword: string, password: string) : Promise<boolean> {
    return await bcrypt.compare(candiatePassword + process.env.AUTH_PROTECT_KEY, password)
} 

// populate tasks
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'userId'
})  

userSchema.methods.changedPasswordAfter = passwordChangedAfterTokenIssued
userSchema.methods.createResetPasswordToken = createResetPasswordToken

userSchema.pre('save', hashPassword)
userSchema.pre('save', modifyUserAttributes)

const User = mongoose.model('User', userSchema)

export default User