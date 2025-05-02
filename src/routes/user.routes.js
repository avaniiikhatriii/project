import {Router} from "express"
import {registerUser} from "../controllers/user.controller.js"
const router = Router()
router.route("/register").post(registerUser)
// router zara ek route lagana jab user register kre 
// to esa url banega http://localhost/8000/users/register but agar pi bh define h age to alag
export default router
