import { randomUUID } from "crypto";
import express from "express";
import path from "path";
import { Upload } from "../entities/upload";
import { User } from "../entities/user";
import { minioClient } from "../minio";

export const main = express.Router();

main.post("/upload", async (req, res) => {
    const key = req.query["key"] as string;

    if(!key) return res.json({error: "No key was provided!"});

    const user = await User.findOne({where: {token: key}, relations: {uploads: true}});

    if(!user) return res.json({error: "Invalid key!"});

    const file = (req.files as any)["file"];

    if(!file) return res.json({error: "No file provided"});

    const fileID = randomUUID();

    const splitMine = file.mimetype.split("/");

    await minioClient.putObject("cdn", fileID, file.data);

    const newUpload = Upload.create({
        upload_type: splitMine[0],
        file_id: fileID,
        file_name: file.name,
        file_size: file.size,
        file_type: splitMine[1],
        file_hash: file.md5,
    });

    await newUpload.save();

    user.uploads.push(newUpload);

    await user.save();
    
    return res.json({
        status: 200,
        file: {
            url: `https://${req.hostname}/${file.name}`
        }
    });
});

main.get("/:filename", (async (req, res) => {
    const {filename} = req.params;

    const file = await Upload.findOne({where: {file_name: filename}, relations: {author: true}});

    if(!file) return;

    const filePath = path.join(__dirname, "../uploads", file.file_id);

    if(req.query.download && parseInt(req.query.download as string) === 1) {
        res.setHeader("Content-Disposition", "attachment; filename=" + file.file_name);
    }
    
    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Type", `${file.upload_type}/${file.file_type}`);

    try {
        const fetched = await minioClient.getObject("cdn", file.file_id);

        fetched.pipe(res);
    }catch(err) {
        return res.json({error: "File doesn't exist!"});
    }
}));