const Joi = require('@hapi/joi');


const authRvalidation = (data)=>{
    const schema = Joi.object({
        sso     : Joi.number()
                 .required(),
        username: Joi.string()
                 .min(3)
                 .max(30)
                 .required(),
        emailid: Joi.string()
               .email({  minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
               .required(),
        password : Joi.string()
                   .min(6)
                   .required()
    });

   return  schema.validate(data);
    
};

const authLvalidation = (data)=>{
    const schema = Joi.object({
        sso : Joi.number()
              .required(),
        password : Joi.string()
                   .min(6)
                   .required()
    });

    return schema.validate(data);
}


module.exports = { authRvalidation, authLvalidation}