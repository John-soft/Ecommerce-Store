const { Schema, model} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase: true
    },
    expiry:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
});

//Export the model
module.exports = model('Coupon', couponSchema);