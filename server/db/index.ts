import mongoose from "mongoose";
import {FileSchema, UserSchema} from "~/server/db/schemas";

const config = useRuntimeConfig();
export const initDatabase = () => new Promise(async (resolve, reject) => {
    try {
        await mongoose.connect(config.MONGODB, {dbName: "Content"});
        console.log("Connected to database");
        resolve(true);
    }catch(err) {
        console.log(err);
        reject(false);
    }
});

export const DB_User = mongoose.model("User", UserSchema);
export const DB_File = mongoose.model("Files", FileSchema);