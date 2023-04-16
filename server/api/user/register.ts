import {userSchema} from "~/server/schemas";
import {DB_User} from "~/server/db";
import {hashPassword} from "~/server/utils";
import {randomUUID} from "crypto";

export default defineEventHandler(async (e) => {
    if(e.req.method === "POST") {
        const body = await readBody(e);
        const isValid = userSchema.safeParse(body);
        if(!isValid.success) return {error: isValid.error};

        const user = await DB_User.findOne({email: body.email});
        if(user) return {error: {message: "User already exists"}};

        const hashedPassword = await hashPassword(body.password);
        if(!hashedPassword) return {error: {message: "Couldn't hash password"}};

        const token = randomUUID();

        const newUser = DB_User.create({
            email: body.email,
            password: hashedPassword,
            token
        });

        return {data: {token: token}};
    }
});

