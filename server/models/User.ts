import mongoose from 'mongoose'
    
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function (confirmString){
                return confirmString === this.password
            },
            message: 'Passwords do not match!'
        }
    },  
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],     
    location: String,
    active: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model('User', userSchema)

export default User