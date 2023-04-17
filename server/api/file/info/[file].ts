import {storageClient} from "~/server/storage";
import {DB_File} from "~/server/db";

export default defineEventHandler(async (e) => {
    const config = useRuntimeConfig();

    if(e.req.method === "GET") {
        const file_name = e.context?.params?.file;
        const file = await DB_File.findOne({file_name});

        if(!file) return {error: {message: "File doesn't exist"}}

       return {data: {file, url: `${config.BASE}/file/${file_name}`}};
    }
});

