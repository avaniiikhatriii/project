// ye file isliye banayi h taki jab bhi kuvh uppload hoga to middlewear call hoke hum us media ya file ko server pe save krlenge jo ki ek filename return kregi to wo local file path k nam se cloudinary mai use hoga aur server se wo media cloudinary m save ho jayegi


import multer from "multer";

const storage = multer.diskStorage ({//disk  m  store kro
  destination: function(req , file , cb){
    cb(null , "./public/temp")// file ka path
  },
  filename : function(req , file , cb){
    cb(null ,file.originalname )//jis nam se user ne dia usi se dedo file ka nam
  }
})//cb ka full form hai callback.

// Yeh ek function hota hai jo tumhare diye hue value ko multer ko wapas bhejne ka kaam karta hai.

// Tum cb() ko call karti ho to tum multer ko keh rahi ho:
// “Maine decision le liya — ab kaam karo.”

export const upload  = multer({
  storage ,      // Left-side storage → is the key of the object you're passing to multer()

 // Right-side storage → is the variable you already declared earlier
 //Jab key aur value ka naam same hota hai, to JavaScript me aise likhne ki shortcut hoti hai:
})

// iske bad ki vedio hai http ke bare m 
// dekho jo mechanosm h pass krne ka text ko wo http aur https mai almost same hota h bas 
//layer ka antar h https zyada secure h mtlb network ke beech m ko bh us data ko padh nh skta h 
//ques ye h ki tranfer kese krega
//isme 2 cheeze h ek h client aur ek h server 
// 3 keywords bhot use honge 
// 1) URI (UNIFORM RESOURCE IDENTIFIER)
// 2) URL (UNIFORM RESOURCE LOCATOR)
// 3) URN (UNIFORM RESOURCE NAME)
