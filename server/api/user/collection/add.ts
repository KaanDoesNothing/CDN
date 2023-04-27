import {DB_Collection, DB_File, DB_User} from "~/server/db";
import {addToCollectionSchema} from "~/server/schemas";
export default defineEventHandler(async (e) => {
    if(e.req.method === "POST") {
        const body = await readBody(e);
        const isValid = addToCollectionSchema.safeParse(body);
        if(!isValid.success) return {error: isValid.error};


        let user = await DB_User.findOne({token: body.token});
        if(!user) return {error: {message: "Invalid token"}};

        const fileExists = await DB_File.findOne({file_id: body.file_id});
        if(!fileExists) return {error: {message: "Invalid file_id"}};

        const collection = await DB_Collection.findOne({author: user.email, name: body.collection});
        if(!collection) return {error: {message: "Invalid collection"}};

        //@ts-ignore
        if(collection.files.includes(body.file_id)) return {error: {message: "File already added to collection"}};

        //@ts-ignore
        collection.files.push(body.file_id);

        await collection.save();

        return {data: true};
    }
});

