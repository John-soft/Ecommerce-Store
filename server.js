const app = require('./app')
require('dotenv').config()
const dbConnect = require('./config/connectDB')


const PORT = process.env.PORT
dbConnect(process.env.LOCAL_CONN_STR)
app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on port ${PORT}`);
})