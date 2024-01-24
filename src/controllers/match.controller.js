import Users from "../models/user.model.js";

export const getUserMatch = async (req, res, next) => {
    try {
        const userData = await Users.findById(req.params.id);
        console.log(req.params.id, userData);

        // todo: check all these user preferences (account should be verified)
        // ! gender - user (string) should match with to-find-user to be shown (array)
        // * sexual orientation - should match the same (both string)
        // * to find - (not really required)
        // ! to be shown - reverse of gender (first point)
        // ? age - to-find-user must be in the age limit of user
        // ? distance - to-find-user must be in the specified area based on the distance
        // * all the preferences based on the selected category


        return res.status(200).send({ data: userData, message: "User Profile updated!", status: true })
    } catch (e) {
        console.log("user match err: ", e)
        return res.status(500).json({ error: e, message: "Internal server error", status: false })
    }
}