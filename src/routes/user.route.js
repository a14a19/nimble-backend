import { Router } from "express";
import { userSignIn, userSignUp, userVerification, userVerifyingOTP, getUserDetails, updateUserProfile, updateUserProfilePic, updatePassword } from "../controllers/user.controller.js";
import { userSignInValidation, userSignUpValidation, userVerificationValidation, userPasswordValidation } from "../validators/user.validator.js";
import upload from "../middlewares/multer.js";

const userRoute = Router();

userRoute.get("/", (req, res, next) => {
    res.send({ msg: 'User of Nimble' })
})

userRoute.post("/sign-in", userSignInValidation, userSignIn)

userRoute.post("/sign-up", userSignUpValidation, userSignUp)

userRoute.post("/verify-email", userVerificationValidation, userVerification)

userRoute.post("/verify-otp/:id", userVerifyingOTP)

userRoute.put("/update/:id", updateUserProfile)

userRoute.put("/update-profile-pic/:id", upload.single('profilePic'), updateUserProfilePic)

userRoute.get("/user/:id", getUserDetails)

userRoute.put("/update-password/:id", userPasswordValidation, updatePassword)

export default userRoute;