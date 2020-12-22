import joi from 'joi'

export const loginSchema = joi.object({
    login: joi.string().min(3).required(),
    pass: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})


