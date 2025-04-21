const mongoose= require("mongoose");
const { stringify } = require("querystring");

const chatSchema= mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        maxLength:50
    },
    to:{
        type:String,
        required:true,

    },
    created_at:{
        type:Date,
    },
})

const Chat= mongoose.model("Chat",chatSchema);

module.exports= Chat;