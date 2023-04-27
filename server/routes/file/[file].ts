import {Attachment, DB_File} from "~/server/db";

export default defineEventHandler(async (e) => {
    if(e.req.method === "GET") {
        const file_name_raw = e.context?.params?.file;
        const file_name = new URLSearchParams(`name=${file_name_raw}`).get("name");
        const file = await DB_File.findOne({file_name});

        if(!file) return {error: {message: "File doesn't exist"}}

        if(!file.served) {
            file.served = 1;
        }else {
            file.served++;
        }

        if(!file.file_type) {
            file.file_type = file.mime_type.split("/")[0];
        }

        await file.save();

        return sendStream(e, Attachment.readFile({filename: `${file.file_id}-${file.file_name}`}));
    }
});

