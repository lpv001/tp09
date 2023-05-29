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


function getToken(user) {
    return jwt.sign({
        data: user,
    },"sfbsd!sad@!dsf#$#", { expiresIn: '1200s' })
}

export {
    register,
    login,
    getuser
}