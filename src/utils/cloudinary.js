// ye file ka kaam h server se cloudinary pe imag/file ko dalna 

import {v2 as cloudinary} from "cloudinary"//v2 naam acha nh laga isliye as cloudinary lia

import fs from "fs"
// fs is given by node known as file structure 
//fs ka matlab hota hai File System — yeh Node.js ka ek built-in module hai jo tumhe file system ke sath kaam karne deta hai. Iska use tum kar sakti ho file read, write, delete, rename, create folders, etc. ke liye — bilkul jaise Windows Explorer ya Finder me manually karti ho, par yeh sab code se hota hai.

//fs.readFileSync — Synchronous version (blocking)

//fs.readFile — Asynchronous version (non-blocking, needs callback)
//Agar tum Cloudinary me file upload kar rahi ho, to kabhi-kabhi fs use hota hai file ko pehle read karke Cloudinary ko dene ke liye.

cloudinary.config(
  {
    cloudinary_name:process.env.CLOUDINARY_CLOUD_NAME ,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
  }
)
//^ISI KI WAJH SE APAN DB PE UPLOAD KR PA RHE
const fileuplaod = async (localfile ) =>{
  try{
 if(!localfile) return null
 const response = await cloudinary.uploader.upload(localfile ,{//loacal se destination dedi aapan ne aur type 
  resource_type:"auto" // bhai khud dekh lena isliye auto
 })
 //response ek JavaScript object hoga jo Cloudinary ke server se aata hai. Ye object me uploaded file ke baare me kaafi information hoti hai.
  // file has been uploaded successfull
 //console.log("file is uploaded on cloudinary ", response.url);
 fs.unlinkSync(localfile) // remove krna server se us file ko 
 return response ; // uploaded file ki info 
  }
  catch (error) {
    fs.unlinkSync(localfile) // remove the locally saved temporary file as the upload operation got failed
    return null;
}
}



export {fileuplaod}
