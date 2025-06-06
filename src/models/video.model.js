import mongoose , {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema (
  {
      videoFile:{
        type:String ,
        required:true 
      },
      
      thumbNail:
                {
      type: String ,
      required:true 
    },
    title:{
      type:String ,
      required:true 
    },
    description:{
      type:String ,
      required:true 
    },
    duration:{
      type:Number , // ye hume cloudinary he dedega usme ye feature rehta h 
      required:true 
    },
    views:{
      type:Number ,
      default:0,
     
    },
    isPublished:{
      type:Boolean ,
     default:true 
    },
    Owner:{
        type: Schema.types.ObjectId,
        ref:"User"
    }
  }, 
  {
    timestamps:true 
  }
)
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video" ,videoSchema )