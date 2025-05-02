class ApiResponse {
  constructor(statusCode, data, message = "Success"){
      this.statusCode = statusCode
      this.data = data
      this.message = message
      this.success = statusCode < 400
  }
}
//isse respnse bhi ek streamline mai jayenge 
export {ApiResponse}