import {Attachment, DB_File, initDatabase} from "~/server/db/index";
import {storageClient} from "~/server/storage";

export default async () => {
    await initDatabase();

    const res = await DB_File.find();

    for (let i in res) {
        const file = res[i];

        try {
            const fetched = await storageClient.getObject("cdn", file.file_id);
            if(fetched && !(await Attachment.findOne({filename: `${file.file_id}-${file.file_name}`}))) {
                Attachment.writeFile({filename: `${file.file_id}-${file.file_name}`}, fetched);
            }
        }catch(err) {
            console.log("File not found");
        }
    }
}