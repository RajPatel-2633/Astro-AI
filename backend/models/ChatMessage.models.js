import mongoose from "mongoose";
import { Schema } from "mongoose";

const chatMessageSchema = new Schema({
    session_id:{
        type:Schema.Types.ObjectId,
        ref:"ChatSession",
        required:true,
        index:true
    },
    role:{
        type:String,
        enum:["user","system","model"],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tokens_used:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

const ChatMessage = mongoose.model("ChatMessage",chatMessageSchema);

export default ChatMessage;