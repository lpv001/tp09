import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username:{
        type: String,
        require: true
    },
    firstname:{
        type: String,
        require: true
    },
    lastname:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},{timestamps: true})

export default mongoose.model('user', UserSchema)