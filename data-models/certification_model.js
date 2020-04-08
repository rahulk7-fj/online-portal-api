const mongoose = require('mongoose');

const certification_doc = {
         
       certification_Name : { type: String , required : true},
       certification_Authority : { type: String , required : true}
}

const cert_details = mongoose.Schema(certification_doc);

module.exports = mongoose.model("certification_list", cert_details); 