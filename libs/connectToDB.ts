import mongoose from 'mongoose';

let is_connected = false;

export function ConnectToDB() {
    try {
        if (!is_connected) {
            mongoose.connect(process.env.MONGODB_URL || "", {
                dbName: "major_project",
            });
            console.log("Connected to Database on ", new Date().toTimeString());
            is_connected = true
        }
    } catch (error) {
        console.log("Error Connecting to Database");
        return error;
    }
}


