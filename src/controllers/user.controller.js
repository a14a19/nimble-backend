import Users from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const userSignIn = async (req, res, next) => {
    try {
        const checkUserDetail = await Users.find({ email: req.body.email });
        const { password, ...claims } = checkUserDetail[0]._doc;
        const pwdCheck = new Users(req.body);
        
        if (pwdCheck.validatePassword(req.body.password, checkUserDetail[0].password)) {
            const token = jwt.sign(claims, process.env.JWT_TOKEN_KEY, {
                algorithm: 'HS256',
                expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
            });
            checkUserDetail[0].token = token;
            return res.status(200).send({ data: claims, token: token, error: undefined, message: "User sign-in successful", status: pwdCheck.validatePassword(req.body.password, checkUserDetail[0].password) })
        } else {
            return res.status(400).send({ data: undefined, error: "Password didn't matched", message: "Password didn't matched", status: false })
        }
    } catch (e) {
        console.log("sign in user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const userSignUp = async (req, res, next) => {
    try {
        return res.status(200).send({ message: "User sign-up acceptable!", status: true })
    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const userVerification = async (req, res, next) => {
    try {
        // General Case
        // If you want to generate an integer in the range [x, y), you can use the following code:
        // Math.floor(x + (y - x) * Math.random());
        const otp = Math.floor(1000 + (9000 * Math.random()));

        // console.log(token);
        console.log(process.env.OTP_JWT_TOKEN_EXPIRES_IN);

        const token = jwt.sign({ "otp": otp }, process.env.OTP_JWT_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.OTP_JWT_TOKEN_EXPIRES_IN
        });
        

        return res.status(200).send({ token: token, status: true })
    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const userRegistration = async (req, res, next) => {
    try {
        const token = req.body.token;
        const user_otp = req.body.otp;

        const decoded_token = jwt.decode(token);
        console.log(decoded_token);
        console.log(req.body);
        
        if (user_otp === decoded_token.otp) {
            const data = {
                fullName: req.body.fullName,
                number: req.body.number,
                email: req.body.email,
                password: req.body.password,           
            }
            data.password = await bcrypt.hashSync(data.password, Number(process.env.BCRYPT_SALT));
    
            const userDetails = await new Users(data).save();
            return res.status(200).send({ data: userDetails, message: "User registration successful!", status: true })
        }
        else {
            return res.status(404).send({ data: undefined, message: "Please enter valid OTP!", status: false })
        }
    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}