import { config } from "dotenv";
config();

import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';
import morgan from "morgan";

import { cornJob } from "./middlewares/cron.js";
import routes from "./routes/index.js";
import { checkExistingDirectory } from "./utils/fileStructure.js";

// ! cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRETKEY
});

// ! checking upload folder
checkExistingDirectory("/public/profile-pic")

// ! cron
cornJob();

// ! db
import { connectToDatabase } from "./db/db.js";

// ! app utilities
app.use(cors((req, cb) => {
    let corsOptions = { origin: true, credentials: true };
    cb(null, corsOptions)
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")) // ? remove in production mode

// ! routing
app.use("/api/v1", routes);

// ! server listening
connectToDatabase()
    .then(() => {
        app.listen(process.env.PORT, process.env.HOSTNAME, () => {
            console.log(`Server running at -> http://${process.env.HOSTNAME}:${process.env.PORT}/api/v1`);
        });
    })
    .catch((err) => {
        console.warn("error => ", err)
    })