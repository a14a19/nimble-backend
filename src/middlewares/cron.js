import cron from "node-cron";
import Users from "../models/user.model.js";

async function removeUsers() {
    console.log("Print this")
    const user = await Users.find({});
    console.log(new Date(user[0].dob))
}

export const cornJob = () => {

    // ! cron for every week
    cron.schedule('*/1 */9 * * 0', removeUsers);

    // * cron for every 1min
    cron.schedule('*/1 * * * *', removeUsers);
};


// ┌────────────── every second (optional) 0-59
// │ ┌──────────── every minute 0-59
// │ │ ┌────────── every hour 0-23
// │ │ │ ┌──────── every day of month 1-31
// │ │ │ │ ┌────── every month 1-12 (or names)
// │ │ │ │ │ ┌──── every day of week 0-7 (or names, 0 or 7 are sunday)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *