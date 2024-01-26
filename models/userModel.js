const {Schema, model, Types} = require('mongoose')
const bcrypt = require('bcrypt')

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
        minlength:[4, 'Passwords should be more than 4 characters'],
        
    },
    role: {
        type: String,
        default: 'user'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    address: [{
        type: Types.ObjectId, 
        ref: 'Address',

    }],
    wishlist: [{
        type: Types.ObjectId,
        ref: 'Product',

    }],
    refreshToken: {
        type: String
    },
},{timestamps: true});


userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordCorrect = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//Export the model
const User = model('User', userSchema);
module.exports = User


