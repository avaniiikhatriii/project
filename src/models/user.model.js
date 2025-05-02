//mongo db jesei ek user ko save krta h to automatically ek unique id create krta h 
//bson data ki tarah save krta h json ki trh nh krta h 

// avatar aur image ek 3 party pe u[load krke waha se link lelenge 
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt"
import mongoose , {Schema}from "mongoose";
//bcryptjs is optimized bycrypt in plain js with 0 dependencies and compatible to bcrypt ...........it hash the password

// jwt - jsonwebtokean 
// ye dono package cryptography pe based h 
//payload(data) mai inject ho jate h 
// jwt mai verification sign bhi lagta h  aur secrets bhi hote h jo sabkuch protect krke rkhte h .....ye dono package har project mai use hote
// direct enrypt krna mushkil hota h to hume mongoose ke hooks ki help leni padhti h jese ki pre hook ..ye ek middleware h ..pre ka kam h ki jese he koi event occur hona h usse just phele jese ki save hone se just phele 

const userSchema = new Schema (
  {
       username: {
        type:String,
        required:true ,
        lowercase:true ,
        unique:true ,
        trim:true ,
        index:true // db mai searching ke liye field thoda bhari op h to soch smjkr imp jagah use kro 
       },
       email:{
        type:String,
        required:true ,
        lowercase:true ,
        unique:true ,
        trim:true ,
       },
       fullName:{
        type:String,
        required:true ,
        trim:true ,
        index:true 
       },
       avatar:{
        type:String ,
        required : true 
       },
       coverImage:{
        type: String, // cloudinary url
       },
       watchHistory: [
        {
          //kafi complex cheez h ye 
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,//bhai itna clear string kese save kr rh ho ?? challenge 1
        required: [true, 'Password is required'] // custom error message
    },
    refreshToken: {
        type: String//
    }

},
{
    timestamps: true
}
   
  )
userSchema.pre("save" , async function(next){//this is pre middlewar and hook
if(!this.isModified("password")) return next() ;//this ensures ki koi aur field change to nh hui ...agar koi aur hui h to bhai koi xarurat nh h pass wapas encryprt krne ki .....yha hum arrow function nh likhte coz this ka refrence nh hota arrow function m // next bhi pass krna zaruri

this.password = await bcrypt.hash(this.password,10) //is password ko lekar bcrypt tum encode krdo 10 rounds lagakr
return next() // necessary h kyuki middleware next pe bhot dependent hote

});
//userchema ke andar ek object hota h methods aur usme koi bhi property add kr skte h 
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(this.password , password) //ye function compare boolean type return krta h jo ki batayega ki user ka dia hua pass sahi h ya nh user ka dia hua h function mai passed that is password
}
// jese aap middleware laga skte ho wese aap mongoose ki hekp semehtods laga skte ho  jese updateto()...esei khudke methods bhi define kr skte 

// hanji to apan token bhibanake de skte h ...uske liye hum similarly ek method likh skte h 
userSchema.methods.generateAccessTokens = function(){
  return JsonWebTokenError.sign(//generate krta token
  {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName
},
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}

userSchema.methods.generateRefreshTokens = function(){
  return JsonWebTokenError.sign(//generate krta token
  {
    _id: this._id,
   
},
process.env.ACCESS_REFRESH_SECRET,
{
    expiresIn: process.env.ACCESS_REFRESH_EXPIRY
})
}


export const User = mongoose.model("User" , userSchema)


// mongoose mai aggregate queries likhne k liye kuch install krna padhta h jiska nam h mongoose-aggregate-paginate-v2

//jwt ek barrier token h mtlb ki jo usko bear krta h ye usi ko data deta h aur sahi manta h ...ek chabi ki tarah h ..it has stribg security