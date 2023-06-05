import { Router } from 'express'
import { register, login, getuser, me, update_user, update_password, delete_user } from '../controllers/UserController.js'
import { registerValidator, loginValidator, private_route } from '../middleware/validation.js'


const UserRoute = Router()

UserRoute.post('/register', registerValidator, register)
UserRoute.post('/login', loginValidator, login)

UserRoute.get('/by/:id', private_route, getuser)

UserRoute.get('/me', me)
UserRoute.post('/update-user', update_user)
UserRoute.post('/update-password', update_password)
UserRoute.post('/delete-user', delete_user)

export default UserRoute