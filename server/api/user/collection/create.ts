import {DB_Collection, DB_URL, DB_User} from "~/server/db";
export default defineEventHandler(async (e) => {
    if(e.req.method === "POST") {
        const body = await readBody(e);

        let user = await DB_User.findOne({token: body.token});
        if(!user) return {error: {message: "Invalid token"}};

        await DB_Collection.create({author: user.email, name: body.name, files: []});

        return {data: true};
    }
});

