const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async (uri) => {
    try{
        await mongoose.connect(uri);
        console.log('mongoDB connected')
    }catch(error){
         console.log(process.env.MONGODB_URI);
        console.error('mongoDB is not connected');
        process.exit(1);        
    }
}
module.exports = connectDB;