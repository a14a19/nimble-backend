import { Router } from "express";
import { userSignIn, userSignUp, userVerification, userRegistration } from "../controllers/user.controller.js";
import { userSignInValidation, userSignUpValidation, userVerificationValidation, userAuthenticationValidation } from "../validators/user.validator.js";


const userRoute = Router();

userRoute.get("/", (req, res, next) => {
    res.send({ msg: 'User of Nimble' })
})

userRoute.post("/sign-in", userSignInValidation, userSignIn)

userRoute.post("/sign-up", userSignUpValidation, userSignUp)

userRoute.post("/verify", userVerificationValidation, userVerification)

userRoute.post("/register", userAuthenticationValidation, userRegistration)

export default userRoute;
