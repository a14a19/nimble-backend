import Users from "../models/user.model.js";
import jwt from "jsonwebtoken";

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