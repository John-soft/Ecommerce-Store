const { Schema, model, Types } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default:0,
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDisLiked: {
        type: Boolean,
        default: false,
    },
    likes:[
        {
        type: Types.ObjectId,
        ref:'User'
    }
        ],
    dislikes:[ 
        {
        type: Types.ObjectId,
        ref:'User'
    }
        ],
    images:{
        type:String,
        default: "https://thumbs.dreamstime.com/b/laptop-computer-blog-web-page-screen-technology-business-mass-media-internet-modern-life-concept-close-up-open-75012601.jpg",
    },
    author: {
        type: String,
        default:'Admin'
    },
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});

//Export the model
module.exports = model('Blog', blogSchema);