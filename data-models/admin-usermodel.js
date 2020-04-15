const mongoose = require('mongoose')

const adm_model = {

    sso :{ type: Number , required: true},
    username : { type: String, required : true}, 
    emailid : { type: String, required : true}, 
    password : { type: String, required : true}
}


const  admin_user_data = mongoose.Schema(adm_model);

module.exports = mongoose.model("admin_user_data", admin_user_data);
