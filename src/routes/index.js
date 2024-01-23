import { Router } from "express";
const routes = Router();

import userRoute from "./user.route.js";
import matchRoute from "./match.route.js";

routes.get("/", (req, res) => {
    res.send({ msg: 'Welcome to Nimble' })
});

routes.use("/users", userRoute)
routes.use("/matches", matchRoute)

export default routes;