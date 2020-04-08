const nconf = require('nconf');
const mongoose = require('mongoose');


nconf.argv().env().file('./keys.json');

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const db = nconf.get('mongoDatabase');

const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`

async function connect(){
    try{
        await mongoose.connect(uri,{
            useNewUrlParser:true
        }).then(()=> console.log("Connected to mongoDb")
        ).catch((err)=>console.log(err));
    }catch(err){
        console.log(err)
    }
}

async function closeConn(){
    try{
        await mongoose.disconnect();
    }catch(err){
        console.log(err)
    }
}


module.exports = { connect, closeConn};