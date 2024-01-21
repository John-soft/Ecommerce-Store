const {connect} = require('mongoose') 

const connectDB = async (url) => {
    try {
        connect(url)
        console.log("DB connection successful");
    } catch (error) {
        console.log('Database Error');
    }
}

module.exports = connectDB