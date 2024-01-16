import { check, validationResult } from 'express-validator';
import Users from '../models/user.model.js';

export const userSignInValidation = async (req, res, next) => {

    await check('email', 'Email is required!').exists().trim().run(req);
    await check('email', 'Email should be a string!').isString().run(req);
    await check('email', 'Please enter the correct format for email!').isEmail().run(req);
    await check('email', 'Email is not registered, please sign up!').custom(async (value) => {
        const findUserEmail = await Users.find({ email: value })
        if (findUserEmail.length === 0) {
            return Promise.reject('Email is not registered, please sign up!')
        }
    }).run(req);

    await check('password', 'Password is required!').exists().trim().run(req);
    await check('password', 'Password didn\'t match, please try again!').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).run(req);
    await check('password', 'Password should be string!').isString().run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    } else {
        next();
    }
}