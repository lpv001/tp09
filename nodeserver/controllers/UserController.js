import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const register = async (req, res) => {

    const {
        email,
        username,
        firstname,
        lastname,
        password
    } = req.body

    const hashpassword = await bcrypt.hash(password, "$2a$10$B2o1NNfOuuKYgt8pDDJVfu")

    const newuser = new UserModel({
        email: email,
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: hashpassword
    })
 
    try {

        const user = await UserModel.findOne({ email })
        if (user) return res.status(403).json({message: "User exist"})

        await newuser.save()
        return res.status(201).json(newuser)
    } catch (error) {
        return res.json(error)
    }

}

const login = async (req, res) => {

    const {
        email,
        password,
    } = req.body

    try {
        
        const user = await UserModel.findOne({ email })

        if (!user) return res.status(401).json({message: "Unauthentication"})

        const hashpassword = await bcrypt.hash(password, "$2a$10$B2o1NNfOuuKYgt8pDDJVfu")

        if (hashpassword != user.password) return res.status(401).json({message: "Password is not correct !"})

        const accessToken = getToken(user)

        return res.status(200).json({
            access_token: accessToken,
            uid: user._id,
            message: 'login_sucess'
        })

    } catch (error) {
        return res.status(400).json(error)
    }

}

const getuser = async (req ,res) => {

    const id = req.params.id
    try {
        const user = await UserModel.findById(id)
        return res.status(200).json({
            user: user
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}

const me = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  
    res.header("Access-Control-Allow-Headers", "Cookie");
    const jwt_token = req.headers['cookie']

    const verify = jwt.verify(jwt_token, "sfbsd!sad@!dsf#$#", (err, user) => {
        if (err) {
            console.log("fail")
            return res.status(401).json({
                success: false,
                message: "token expired"
            })
        }
        return res.status(200).json({
            success: true,
            body: user
        })
    })
}

const update_user = async (req, res) => {

    const {_id, username, firstname, lastname} = req.body

    try {
        const user = await UserModel.findByIdAndUpdate(_id, {
            username: username,
            firstname: firstname,
            lastname: lastname
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(401).json({success: "fail"})
    }

}

const update_password = async (req, res) => {

    const {_id, password} = req.body

    const hashpassword = await bcrypt.hash(password, "$2a$10$B2o1NNfOuuKYgt8pDDJVfu")

    try {
        const user = await UserModel.findByIdAndUpdate(_id, {
            password: hashpassword
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(401).json({success: "fail"})
    }

}

const delete_user = async (req, res) => {
    const _id = req.body
    await UserModel.deleteOne({ _id: _id })
    return res.status(200).json({message: "deleted"})
}

function getToken(user) {
    return jwt.sign({
        data: user,
    },"sfbsd!sad@!dsf#$#", { expiresIn: '2400s' })
}

export {
    register,
    login,
    getuser,
    me,
    update_user,
    update_password,
    delete_user
}