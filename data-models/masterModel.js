const mongoose = require('mongoose')

const capg_master_Schema = {
     capgKin : { type: String, require:true},
     sso : { type: Number, require: true},
     name : { type: String, require: true},
     designation : { type: String, require:true},
     band : { type: String, require:true},
     grade : { type: String, require:true},
     syf_Application : { type: String, require:true},
     syf_Tower : { type: String, require:true},
     syf_agile_Team : { type: String, require:true},
     syf_Email : { type: String, require:true},
     capg_Email : { type: String, require:true},
     skill_Set : [{ skill_name : { type: String, require:true}, proficiency : { type: String, require:true}}]
     //certification_Details : [{ userId : mongoose.SchemaTypes.ObjectId, }]

};

const master_user_data = mongoose.Schema(capg_master_Schema);

module.exports = mongoose.model("capg_master_data", master_user_data);