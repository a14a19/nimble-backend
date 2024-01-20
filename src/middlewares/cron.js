import cron from "node-cron";
import Users from "../models/user.model.js";

async function removeUsers() {
    console.log("Print this")
    const user = await Users.find({});
    const date = new Date()
    date.setDate(date.getDate() - 7);
    user.filter(async (userData, i) => {
        console.log(new Date(userData.createdAt).getTime(), date.getTime())
        if (new Date(userData.createdAt).getTime() < date.getTime() && !userData.isVerified) {
            console.log(new Date(userData.createdAt).getTime(), date.getTime())
            await Users.deleteOne({ _id: userData._id })
        }
    })
}

export const cornJob = () => {

    // ! cron for every week
    cron.schedule('*/1 */9 * * 0', removeUsers);

    // * cron for every 1min
    // cron.schedule('*/1 * * * *', removeUsers);

    // ? cron for every 1sec
    // cron.schedule('* * * * * *', removeUsers);
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