const { Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let blogCategorySchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    }
},{
    timestamps: true
});

module.exports = model('BlogCategory',blogCategorySchema);