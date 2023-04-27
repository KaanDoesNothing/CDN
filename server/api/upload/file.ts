import Busboy from "busboy";
import {H3Event} from "h3";
import {Attachment, DB_File, DB_User} from "~/server/db";
import {randomUUID} from "crypto";
import {storageClient} from "~/server/storage";
import stream from "node:stream";

const useFiles = async (event: H3Event) => {
    return new Promise((resolve) => {
        const { req } = event
        const files: { fieldname: string; filename: string; encoding: string; mimetype: string; buffer: Buffer; }[] = []
        const fields: any = {}
        const busboy = Busboy({ headers: req.headers })
        busboy.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info
            var chunks: any = []
            file.on('data', (chunk) => {
                chunks.push(chunk)
            })
            file.on('end', () => {
                files.push({
                    fieldname: name,
                    filename,
                    encoding,
                    mimetype: mimeType,
                    buffer: Buffer.concat(chunks)
                })
            })
        })
        busboy.on('field', (name, value, info) => {
            fields[name] = value
        })
        busboy.on('finish', () => {
            resolve({ files, fields })
        })
        req.pipe(busboy)
    })
}

export default defineEventHandler(async (e) => {
    const config = useRuntimeConfig();

    if(e.req.method === "POST") {
        const { key } = getQuery(e);
        if(!key) return {error: "Invalid Key!"};

        const author = await DB_User.findOne({token: key});

        if(!author) return {error: "Invalid Key!"};

        const {files}: any = await useFiles(e);

        const file = files[0];

        const split_type: string = file.mimetype.split("/");
        const file_type: string = split_type[0];
        const file_ext: string = split_type[1];

        const file_id = randomUUID();

        const writeStream = new stream.PassThrough();
        writeStream.end(file.buffer);
        Attachment.writeFile({filename: `${file_id}-${file.filename}`}, writeStream);

        await storageClient.putObject("cdn", file_id, file.buffer);

        const newFileUpload = DB_File.create({
            author: author.email,
            file_name: file.filename,
            file_type,
            file_id,
            file_ext,
            mime_type: file.mimetype,
            served: 0
        });

        return {
            status: 200,
            file: {
                url: encodeURI(`${config.BASE}/file/view/${file.filename}`)
            }
        }

    }else if(e.req.method === "GET") {
        return {
            error: "Nice try"
        }
    }
});

