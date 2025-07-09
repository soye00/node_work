const mongoose = require('mongoose');
const {MONG_PASSWORD} = process.env;


const mongo_url = `mongodb+srv://ssssssyyy0:${MONG_PASSWORD}@cluster0.e9rwnsx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connect = () =>{
    mongoose.connect(mongo_url,{dbName:'rncs'})
        .then(()=>{
            console.log('Connected MongoDB');
        }).catch((err)=>{
            console.error('MongoDb Error',err);
    });
}

module.exports = connect;