const {Schema, model} = require('mongoose')

// Declare the Schema of the Mongo model
var userSchema = new Schema({
    firstname:{
        type:String,
        required:[true, 'Please enter first name'],
    },
    lastname:{
        type:String,
        required:[true, 'Please enter last name'],
        
    },
    email:{
        type:String,
        required:[true, 'Please enter email'],
        unique:true,
    },
    mobile:{
        type:String,
        required:[true, 'Please enter phone number'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Please enter password'],
        minlength:[4, 'Passwords should be more than 6 characters']
    },
});

//Export the model
const User = model('User', userSchema);
module.exports = User


