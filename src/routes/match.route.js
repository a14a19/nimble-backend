import { Router } from "express";

import { getUserMatch } from "../controllers/match.controller.js";

const matchRoute = Router();

matchRoute.get("/get-user-matches", getUserMatch)

export default matchRoute;
