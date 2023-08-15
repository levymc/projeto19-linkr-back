import Joi from 'joi'

export const userSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } }).required(),
    password: Joi.string().trim().required(),
    confirmPassword: Joi.string().trim().required().valid(Joi.ref('password'))
});
  
export const userLogin = Joi.object({
    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } }).required(),
    password: Joi.string().trim().required(),
});
  
export const urlSchema = Joi.object({
    url: Joi.string().trim().uri().required()
});

