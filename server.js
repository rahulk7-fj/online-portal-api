const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const conn = require('./connection/connection');
const router = require('./routes/apiroutes')

app.use( cors() );

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

try{
    conn.connect();
    app.use('/api',router);
}catch(err){
    console.log(err);
    conn.closeConn();
}






app.listen(8080,()=>{
    console.log(" The service is runing");
})