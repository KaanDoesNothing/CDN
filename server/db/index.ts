import mongoose from "mongoose";
import {CollectionSchema, FileSchema, URLSchema, UserSchema} from "~/server/db/schemas";
import {createBucket} from "mongoose-gridfs";

const config = useRuntimeConfig();
export let Attachment: typeof createBucket;

export const initDatabase = () => new Promise(async (resolve, reject) => {
    try {
        await mongoose.connect(config.MONGODB, {dbName: "Content"});
        console.log("Connected to database");
        resolve(true);
        Attachment = createBucket({modelName: "attachments"});
    }catch(err) {
        console.log(err);
        reject(false);
    }
});

export const DB_User = mongoose.model("User", UserSchema);
export const DB_File = mongoose.model("Files", FileSchema);
export const DB_URL = mongoose.model("URL", URLSchema);

export const DB_Collection = mongoose.model("Collection", CollectionSchema);