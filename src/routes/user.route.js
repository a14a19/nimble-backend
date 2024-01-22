import { Router } from "express";
import { userSignIn, userSignUp, userVerification, userRegistration, getUserDetails, updateUserProfile, updateUserProfilePic } from "../controllers/user.controller.js";
import { userSignInValidation, userSignUpValidation, userVerificationValidation } from "../validators/user.validator.js";


const userRoute = Router();

userRoute.get("/", (req, res, next) => {
    res.send({ msg: 'User of Nimble' })
})

userRoute.post("/sign-in", userSignInValidation, userSignIn)

userRoute.post("/sign-up", userSignUpValidation, userSignUp)

// userRoute.post("/verify", userVerificationValidation, userVerification)

userRoute.post("/register/:id", userRegistration)

userRoute.put("/update/:id", updateUserProfile)

userRoute.put("/update-profile-pic/:id", updateUserProfilePic)

userRoute.get("/user/:id", getUserDetails)

export default userRoute;
