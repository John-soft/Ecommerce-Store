const {Schema, model, Types} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true

    },
    brand: {
        type: String,
        required: true
    },
    quatity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    color: {
        type: String,
    },
    ratings: [
        {
        type: Number,
        postedBy: { type: Types.ObjectId, ref: "User" }
    }
],
},{timestamps: true});

//Export the model
module.exports = model('Product', productSchema);