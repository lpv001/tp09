import mongoose from 'mongoose'

export default function connectDB()
{
    mongoose.set('strictQuery', false)
    mongoose.connect('mongodb+srv://lpv001:venh1234@cluster0.vecrizw.mongodb.net/tpclass8?retryWrites=true&w=majority')
    console.log("Connected to mongoose")
}