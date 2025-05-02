//ab har baar db se connect ho rh h apan to ek he koi code bana do or usme function ka wrapper pehnake  usko call krte rho baar baar ...uske liye ye function h 
// ya to apan promis ke through baatcheet kr skte h ya fr try catch aur async await

const asyncHandler = (reqHandler) =>{ 
  return  (req , res, next)=>{
   Promise.resolve(requestHandler(req , res , next)).catch((err)=>next(err))
   
}
}

//2nd way

// const asyncHanler = (fnc)=async( req , res , next)=>{
//  try {
//   await fn(req, res, next)
//  }
//  catch(error){
//   res.status(err.code||500).json({//status batana padhta h ...user ka dia hua code bh use kr skt e ya fr khudka
//     success:false ,
//     message:err.message //ye frontend eng ke liye esa response dena padhta h
//   })
//  }
// }
export default asyncHandler 