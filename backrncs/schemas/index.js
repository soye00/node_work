const mongoose = require('mongoose');
const mongo_url = process.env.MONG_URL;

const connect = () =>{
    mongoose.connect(mongo_url,{dbName:'rncs'})
        .then(()=>{
            console.log('Connected MongoDB');
        }).catch((err)=>{
            console.error('MongoDb Error',err);
    });
}

module.exports = connect;