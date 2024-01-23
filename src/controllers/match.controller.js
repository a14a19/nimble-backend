export const getUserMatch = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const userData = await Users.findById(req.params.id);
        return res.status(200).send({ data: userData, message: "User Profile updated!", status: true })
    } catch (e) {
        console.log("user match err: ", e)
        return res.status(500).json({ error: e, message: "Internal server error", status: false })
    }
}