//dekho aoan chahte nh h ki error kisi bhi format mai jaye jese ki apan ne app.js mai likha h usko apan standarized krna cvhahte h infact age jake apan multiwares bhi daleneg ki apan ko samjh aye ki humesh aerror whi se pass ho

//node aapan ko ek error class deti h to usko extend krke uska constructor banate h apan
class ApiError extends Error {
  constructor(
      statusCode,
      message= "Something went wrong",
      errors = [],
      stack = ""
  ){
      super(message)
      this.statusCode = statusCode
      this.data = null
      this.message = message
      this.success = false;
      this.errors = errors

      if (stack) {
          this.stack = stack
      } else{
          Error.captureStackTrace(this, this.constructor)//is code ki utni need nh h itz just syntax
      }

  }
}

export {ApiError}