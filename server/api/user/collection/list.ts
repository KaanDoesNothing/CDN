import {DB_Collection, DB_User} from "~/server/db";
import {tokenSchema} from "~/server/schemas";
export default defineEventHandler(async (e) => {
    if(e.req.method === "POST") {
        const config = useRuntimeConfig();

        const body = await readBody(e);
        const isValid = tokenSchema.safeParse(body.token);
        if(!isValid.success) return {error: isValid.error};


        let user = await DB_User.findOne({token: body.token});
        if(!user) return {error: {message: "Invalid token"}};

        const collections = await DB_Collection.find({author: user.email});

        return {data: {collections}};
    }
});

