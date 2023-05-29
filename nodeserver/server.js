import express from "express" //
import connectDB from "./db.js"
import UserRoute from "./routes/UserRoute.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express() //
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
connectDB()

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/v1/user', UserRoute)

app.listen( 3000, () => { //
    console.log("Sever is staring at port 3000")
})