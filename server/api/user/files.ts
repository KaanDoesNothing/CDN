import {tokenSchema} from "~/server/schemas";
import {DB_File, DB_User} from "~/server/db";

export default defineEventHandler(async (e) => {
    if(e.req.method === "POST") {
        const body = await readBody(e);
        const isValid = tokenSchema.safeParse(body.token);
        if(!isValid.success) return {error: isValid.error};

        const user = await DB_User.findOne({token: body.token});
        if(!user) return {error: {message: "Invalid token"}};

        const files = await DB_File.find({author: user.email}).sort({createdAt: "desc"});

        return {data: {files}};
    }
});

