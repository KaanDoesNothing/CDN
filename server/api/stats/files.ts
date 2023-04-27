import {DB_File} from "~/server/db";

export default defineEventHandler(async (e) => {
    if(e.req.method === "GET") {
        const files = await DB_File.find({}, {served: 1});

        return {data: {files: files.reduce((prev, next) => (prev + (next.served | 0)), 0)}};
    }
});

