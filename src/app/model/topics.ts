
import mongoose,{ Schema } from "mongoose";

const topicSchema= new Schema(
   {
    title:String,
    description:String,
   },
   {
    timestamps:true
   }
)

const Topics= mongoose.models.Topics || mongoose.model("Topics",topicSchema);
export default Topics