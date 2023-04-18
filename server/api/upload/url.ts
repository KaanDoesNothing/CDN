import {DB_URL, DB_User} from "~/server/db";
import {randomUUID} from "crypto";
import {urlSchema} from "~/server/schemas";
import {hashPassword} from "~/server/utils";
export default defineEventHandler(async (e) => {
    if(e.req.method === "POST") {
        const config = useRuntimeConfig();

        const body = await readBody(e);
        const isValid = urlSchema.safeParse(body);
        if(!isValid.success) return {error: isValid.error};

        let user;

        if(body.token) user = await DB_User.findOne({token: body.token});

        let content: any = {
            id: randomUUID(),
            url: body.url,
            once: body.once ? body.once : false
        }

        if(user) content.author = user.email
        if(body.password) content.password = await hashPassword(body.password);

        await DB_URL.create(content);

        return {data: {url: `${config.BASE}/url/${content.id}`}};
    }
});

