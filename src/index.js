import ConnectDB from "./db/index.js";
import dotenv from "dotenv"
 import {app} from "./app.js"
ConnectDB()
.then(()=>{
  //app.on se error bhi likh skte h 
  app.listen(process.env.PORT || 8000 , ()=>{
    console.log(`Server is running at port : ${process.env.PORT} `);
  })
})
.catch((err)=>{
  console.log('Connection has issues!!',err)
})


dotenv.config({
  path : './env'
})