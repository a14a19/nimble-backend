import { connect, disconnect } from 'mongoose';

async function connectToDatabase() {
    try {
        await connect(process.env.MONGO_URI)
    } catch (e) {
        console.log(e);
        throw new Error("MongDB connection failed ");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect()
    } catch (e) {
        console.log(e);
        throw new Error("MongDB disconnection failed ");
    }
}

export { connectToDatabase, disconnectFromDatabase };