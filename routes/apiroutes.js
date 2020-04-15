const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nconf = require('nconf');
const router = express.Router();
const validation = require('../validations/validation');
const certDetails = require('../data-models/certification_model');
const registerUser = require('../data-models/admin-usermodel');
nconf.argv().env().file('./keys.json');

const Token = nconf.get('TOKEN');

router.get('/certificationlookup', async(req,res)=>{
     try{
      const data = await certDetails.find();
     // const response = data.json()
      res.status(200).send(data)
     }catch(err){
         res.status(500).send({"error":"Unable to retrive data from Server", "error_Details": err});
         console.log("Error in fetching the list", err);
     }
});


router.post('/register', async (req, res)=>{
    try{
           // We are creating the business object
           const businessObj = {
                sso: req.body.sso,
                username : req.body.username,
                emailid : req.body.emailid,
                password : req.body.password
           }

           var {error} = validation.authRvalidation(businessObj);
           if(error) return res.status(400).send({"id":error.details[0].path[0],"msg":error.details[0].message});
           //Check if sso exists in db
           var ssoExist = await registerUser.findOne({sso: businessObj.sso });
           if(ssoExist) return res.status(400).send({ "id":"sso","msg":"you registered already"});
           var emailExist = await registerUser.findOne({emailid: businessObj.emailid});
           if(emailExist) return res.status(400).send({"id":"emailid","msg":"Email already exists"});
            const salt = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(req.body.password, salt);

            const users = new registerUser(
                {
                    sso: req.body.sso,
                    username : req.body.username,
                    emailid : req.body.emailid,
                    password : hashedPass
                });

                try{
                    var data = await users.save();
                    res.send({"id":data._id, "msg":`Registered with sso ${data.sso}`});
                 }catch(err){
                     console.log(err);
                     res.status(500).send({"msg":"Couldn't insert into DB"});
                 }
    }catch(e){
        console.log("registration error", e);
    }
})

router.post('/login', async (req, res)=>{
    const {error} = validation.authLvalidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        var user = await registerUser.findOne({sso: req.body.sso});
        if(!user) return res.status(400).send("Username or Password is incorrect");
        const gethashPass = user.password;
        const validPass = bcrypt.compare(req.body.password,gethashPass);
        if(!validPass) return res.status(400).send("Wrong Password");
        // Creating an access token
        const token  = jwt.sign({_id:user._id}, Token);
        res.header('access-token', token);
        res.send("SuccessFully Logged In")
        console.log("User Logged In...");
    }catch(err){
        console.log(err);
        res.status(401).send("Unable To Login");
    }
})


router.post('/details', async (req, res)=>{
    try{
        const cDetails = new certDetails({
       certification_Name : req.body.certification_Name,
       certification_Authority : req.body.certification_Authority
       
        })
        var data = await cDetails.save();
        res.send({"id":data._id, "msg":"success"});
     }catch(err){
         console.log(err);
         res.status(500).send({"msg":"Couldn't insert into DB"});
     }
});


module.exports = router;