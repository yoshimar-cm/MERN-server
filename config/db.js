const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('database connect');
    } catch (error) {
        console.log(error);
        process.exit(1); //detener app
    }
}

module.exports = dbConnect;