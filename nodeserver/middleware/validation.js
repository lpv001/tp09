import { Validator } from "node-input-validator"
import jwt from "jsonwebtoken"

async function registerValidator(req, res, next){
    const validator = new Validator(req.body, {
        email: 'required|email',
        username: 'required|string',
        firstname: 'required|string',
        lastname: 'required|string',
        password: 'required|string'
    })
    const matched = await validator.check();
    if (!matched)
        return res.status(422).json({
            success: false,
            message: validator.errors
        })

    next()
}

async function loginValidator(req, res, next) {
    const validator = new Validator(req.body, {
        email: 'required|email',
        password: 'required|string'
    })

    const matched = await validator.check();

    if (!matched)
        return res.status(422).json({
            success: false,
            message: validator.errors
        })

    next()
}

async function private_route(req, res, next){

    const jwt_token = req.cookies.accessToken
    
    if (jwt_token == null) 
        return res.status(401).json({
            success: false,
            message: "user not authenticated"
        })
    const verify = jwt.verify(jwt_token, "sfbsd!sad@!dsf#$#", (err, user) => {
        if (err) {
            console.log("fail")
            return res.status(401).json({
                success: false,
                message: "token expired"
            })
        }
        next()
    })

}

export {
    registerValidator,
    loginValidator,
    private_route
}