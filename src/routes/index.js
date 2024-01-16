import { Router } from "express";
const routes = Router();

import userRoute from "./user.route.js";

routes.get("/", (req, res) => {
    res.send({ msg: 'Welcome to Nimble' })
});

routes.use("/users", userRoute)

export default routes;