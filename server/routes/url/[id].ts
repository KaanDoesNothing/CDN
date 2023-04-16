import {storageClient} from "~/server/storage";
import {DB_File, DB_URL} from "~/server/db";

export default defineEventHandler(async (e) => {
    if(e.req.method === "GET") {
        const id = e.context?.params?.id;
        const file = await DB_URL.findOne({id});

        if(!file) return {error: {message: "File doesn't exist"}}

        if(file.password) return sendRedirect(e, `https://${e.req.headers.host}/url/unlock/${id}`);

        return sendRedirect(e, file.url);
    }
});

