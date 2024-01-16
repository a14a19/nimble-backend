import { Router } from "express";
import { userSignIn } from "../controllers/user.controller.js";
import { userSignInValidation } from "../validators/user.validator.js";

const userRoute = Router();

userRoute.get("/", (req, res, next) => {
    res.send({ msg: 'User of Nimble' })
})

userRoute.post("/sign-in", userSignInValidation, userSignIn)

export default userRoute;
