import {storageClient} from "~/server/storage";
import {Attachment, DB_File} from "~/server/db";

export default defineEventHandler(async (e) => {
    if(e.req.method === "GET") {
        const file_name = e.context?.params?.file;
        const file = await DB_File.findOne({file_name});

        if(!file) return {error: {message: "File doesn't exist"}}

        // const fetched = await storageClient.getObject("cdn", file.file_id);

        if(!file.served) {
            file.served = 1;
        }else {
            file.served++;
        }

        if(!file.file_type) {
            file.file_type = file.mime_type.split("/")[0];
        }

        await file.save();

        // fetched.pipe(e.res);
        // fetched.end

        return sendStream(e, Attachment.readFile({filename: `${file.file_id}-${file.file_name}`}));
    }
});

