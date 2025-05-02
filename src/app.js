import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//cookieparser ka kaam h ki server apne client ki cookies par CRUD OPERATION LAGA PAYE
const app = express()
//middleware ke sath use krte h .use ka .....cors btata h ki kon allowed h ya nh
//basically kese kese data ane wala h sabko lene ke tareke edefine ho rh h 
app.use(cors(//CONFIGURE HOGYA
  {
    origin:process.env.CORS_ORIGIN ,//this tells ki kon h allow * mtlb ki sab
      credentials:true 
  }
))

app.use(express.json({limit:"16kb"})) // phele express ko jb data lena hota th to parcer use krn padhta tha ......
//limit ek property h aur bh hoti h
//url se data lena thoda tedi kheer h kyuki usme kafi bar speical char wagera khudse introduce ho jate h eg in space
app.use(express.urlencoded({extended:true , limit:"16kb"})) // agar ye andar ki cheeze na likho to bh chlega ...extended srf object ke andar objects likhe h to usko true krne k liye h 
app.use(express.static("public"))//kuch esa data jo sabko dikh jaye common sa to uske liye h ye data server mai openly accessible hoga aur public ka mtlb idher file ka naam h'

app.use(cookieParser()) // cofigure hogya 

//routes wagera yaha impport kiye jate h 
import userRouter from "./routes/user.routes.js"
//phele hum router direct get krke likh rhe the par ab yha files sab alag h routes aur controller wagera ki to na hum routes direct method ke through nh likh skte humko phele middleware lagaana padhega 
app.use("/api/v1/users" , userRouter) // jab bh /users likhenge url mai to control userRouter ke pas chle jayega ...routes ke andar jo file h waha chle jayenge
//ab users ke sath jitne bhi method likhe jayenge unka controll jayega user.controller mai or /users/login for exapmle ese ho jayega 
//* ab achi practice to ye hoti h ki api bhi url mai define ho 


export {app}