import {storageClient} from "~/server/storage";
import {DB_File, DB_URL} from "~/server/db";
import {unlockURLSchema, urlSchema} from "~/server/schemas";
import {comparePassword} from "~/server/utils";

export default defineEventHandler(async (e) => {
    if(e.req.method === "GET") {
        const body = await readBody(e);
        const id = e.context?.params?.id;
        const file = await DB_URL.findOne({id});

        const isValid = unlockURLSchema.safeParse(body);
        if(!isValid.success) return {error: isValid.error};

        if(!file || !file.password) return {error: {message: "File doesn't exist"}}

        const isCorrect = await comparePassword(body.password, file.password);

        if(!isCorrect) return {error: {message: "Incorrect Password"}};

        return {data: {url: file.url}};
    }
});

