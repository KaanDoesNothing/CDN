import {tokenSchema} from "~/server/schemas";
import {DB_User} from "~/server/db";

export default defineEventHandler(async (e) => {
    if(e.req.method === "POST") {
        const body = await readBody(e);
        const isValid = tokenSchema.safeParse(body.token);
        if(!isValid.success) return {error: isValid.error};

        const user = await DB_User.findOne({token: body.token});
        if(!user) return {error: {message: "Invalid token"}};

        return {data: {user}};
    }
});

