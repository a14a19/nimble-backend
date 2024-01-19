import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Users from "../models/user.model.js";
import Traits from "../models/traits.model.js";
import UpdateProfile from "../models/updateProfile.model.js";

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
        const otp = Math.floor(1000 + (9000 * Math.random()));
        const token = jwt.sign({ "otp": otp }, process.env.OTP_JWT_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.OTP_JWT_TOKEN_EXPIRES_IN
        });
        console.log(token);

        const data = {
            fullName: req.body.fullName,
            number: req.body.number,
            email: req.body.email,
            password: req.body.password,           
        }
        data.password = bcrypt.hashSync(data.password, Number(process.env.BCRYPT_SALT));
        
        const userDetails = await new Users(data).save();

        return res.status(200).send({ data: userDetails, token: token, message: "User Registration Successful!", status: true })
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
        const token = jwt.sign({ "otp": otp }, process.env.OTP_JWT_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.OTP_JWT_TOKEN_EXPIRES_IN
        });

        // console.log(token);
        
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

        if (user_otp === decoded_token.otp) {
            await Users.findByIdAndUpdate(req.params.id, { isVerified: true });
            return res.status(200).send({ message: "User Verification successful!", status: true })
        }
        else {
            return res.status(404).send({ data: undefined, message: "Please enter valid OTP!", status: false })
        }
    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send({ data: user, message: "User Profile updated!", status: true })
    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const getUserDetails = async (req, res, next) => {
    try {
        const traits = await Traits.find({});
        let user = await Users.findById(req.params.id);
        user = user["_doc"];
        let updateUser = new UpdateProfile({});
        
        let modifiedUser = Object.keys(user).filter((key) => key in updateUser["_doc"]);
        modifiedUser.forEach((key) => {
            updateUser[key] = user[key];
        });

        updateUser.passion = traits[0]["passion"];
        updateUser.typeOfPerson = traits[0]["typeOfPerson"];

        const passion_categories = ["Entertainment", "FoodAndDrink", "Pets", "Sports", "TravellingAndActivities"];
        passion_categories.forEach((key) => {
            user[key].forEach((pass_key) => updateUser["passion"][key][pass_key] = true);
        });

        const traits_categories = ["AstrologySign", "Personality"];
        traits_categories.forEach((key) => {
            user[key].forEach((traits_key) => updateUser["typeOfPerson"][key][traits_key] = true);
        });
        
        return res.status(200).send({ data: updateUser, message: "User Profile updated!", status: true })
    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}