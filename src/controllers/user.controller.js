import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as cloudinary from 'cloudinary';
import * as fs from "fs";
import * as path from "path";

import Users from "../models/user.model.js";
import Traits from "../models/traits.model.js";

import { twoObjMerging } from "../utils/helpers.js";

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
        const currentScreen = req.body.currentScreen;
        const otp = Math.floor(1000 + (9000 * Math.random()));
        const token = jwt.sign({ "otp": otp }, process.env.OTP_JWT_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.OTP_JWT_TOKEN_EXPIRES_IN
        });
        console.log(otp, token);

        if (currentScreen === "SignUp") {

            const todayDate = new Date().setFullYear(new Date().getFullYear() - 18);
            const userDob = new Date(req.body.dob)

            if (userDob.getTime() > todayDate) {
                return res.status(200).send({ data: undefined, message: "User must be 18+", status: false })
            }

            const data = {
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                dob: req.body.dob,
            }

            data.password = bcrypt.hashSync(data.password, Number(process.env.BCRYPT_SALT));

            const userDetails = await new Users(data).save();

            return res.status(200).send({ data: userDetails, token: token, message: "User Registration Successful!", status: true })
        }

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

        console.log(otp, token);

        const data = {
            email: req.body.email,
        }
        const userData = await Users.find(data).select('-password');
        if (userData.length > 0) {
            return res.status(200).send({ data: userData, token: token, message: "User is Registered.", status: true })
        } else {
            return res.status(404).send({ data: undefined, message: "User not registered, please signup.", status: false })
        }

    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const userVerifyingOTP = async (req, res, next) => {
    try {
        console.log(req.body);
        const token = req.body.token;
        const userOtp = req.body.otp;
        const prevScreen = req.body.prevScreen;
        const decoded_token = jwt.decode(token);

        if (userOtp === decoded_token.otp) {
            if (prevScreen === "SignUp") {
                await Users.findByIdAndUpdate(req.params.id, { isVerified: true });
            }
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
        let user = await Users.findByIdAndUpdate(req.params.id, req.body).select('-password');
        let traits = await Traits.find({});
        let passion = twoObjMerging(traits[0].passion, req.body);
        let typeOfPerson = twoObjMerging(traits[0].typeOfPerson, req.body);

        Object.entries(user._doc).map((elem) => {
            if (traits[0].passion._doc.hasOwnProperty(elem[0]) || traits[0].typeOfPerson._doc.hasOwnProperty(elem[0])) {
                delete user._doc[`${elem[0]}`];
                delete req.body[`${elem[0]}`];
            }
        })

        return res.status(200).send({ data: { ...user._doc, ...req.body, passion: passion, typeOfPerson: typeOfPerson }, message: "User Profile updated!", status: true })
    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const updateUserProfilePic = async (req, res, next) => {
    try {
        const __dirname = path.resolve("");
        const filePath = req.file.path;
        const cloudinaryPath = path.join(__dirname + "\\" + filePath);
        console.log(req.file, req.params.id, filePath, __dirname, path.join(__dirname + "\\" + filePath))

        // ! uploading to cloudinary
        const cloudinaryResp = await cloudinary.v2.uploader.upload(cloudinaryPath);
        console.log(cloudinaryResp);

        // ! if image is saved at cloudinary, updating profile and delete from backend
        if (cloudinaryResp.secure_url) {
            let userData = await Users.findByIdAndUpdate(req.params.id, { profilePhoto: cloudinaryResp.secure_url }).select('-password');
            console.log(userData);
            fs.unlinkSync(cloudinaryPath);
            return res.status(200).send({ data: { ...userData._doc, profilePhoto: cloudinaryResp.secure_url }, message: "User Profile Pic updated", status: true })
        } else {
            return res.status(404).send({ data: undefined, message: "Error in uploading profile pic", status: false })
        }

    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const getUserDetails = async (req, res, next) => {
    try {
        let user = await Users.findById(req.params.id, { password: 0 });
        let traits = await Traits.find({});
        let passion = twoObjMerging(traits[0].passion, user._doc);
        let typeOfPerson = twoObjMerging(traits[0].typeOfPerson, user._doc);

        Object.entries(user._doc).map((elem) => {
            if (traits[0].passion._doc.hasOwnProperty(elem[0]) || traits[0].typeOfPerson._doc.hasOwnProperty(elem[0])) {
                delete user._doc[`${elem[0]}`]
            }
        })

        return res.status(200).send({ data: { ...user._doc, passion: passion, typeOfPerson: typeOfPerson }, message: "User Profile updated!", status: true })

    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const updatePassword = async (req, res, next) => {
    try {
        if (req.body.password !== req.body.cnfPassword) {
            return res.status(404).send({ data: undefined, message: "Password doesn't match with confirmed password", status: req.body.password === req.body.cnfPassword })
        }
        let user = await Users.findById(req.params.id);
        user["password"] = await bcrypt.hashSync(req.body.password, Number(process.env.BCRYPT_SALT));
        await user.save();
        return res.status(200).send({ data: user, message: "User password updated", status: true })
    } catch (e) {
        console.log("sign up user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}
