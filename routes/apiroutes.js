const express = require('express');
const router = express.Router();
const certDetails = require('../data-models/certification_model');


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