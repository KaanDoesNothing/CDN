import { Upload } from "./entities/upload";
import { hashPassword, comparePassword, formatBytes } from "./utils";
import { User } from './entities/user';
import {randomUUID} from "crypto";
import express, { Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import expressSession from "express-session";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(__dirname, "../uploads");

fs.mkdirSync(uploadsDir, {recursive: true});

import {db} from "./db";
import { defaultParams, getUser, isAuthenticated } from "./middleware";
import { Collection } from "./entities/collection";

db.connect();

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({extended: true}));

app.locals.modules = {
    formatBytes
}

app.set("view engine", "pug").set("views", path.join(__dirname, "../views"));
app.use(express.static(uploadsDir));

const sessionMiddleware = expressSession({
    secret: "hmmm",
    resave: false,
    saveUninitialized: false
});

app.use(sessionMiddleware);

app.use(expressFileUpload({
    createParentPath: true
}));

app.use(defaultParams);

app.get("/auth/session", isAuthenticated, getUser, (req, res) => {
    res.json(res.locals.user);
});

app.get("/auth/login", (req, res) => {
    return res.render("auth/login");
});

app.post("/auth/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email) return res.render("error", {message: "Provide an email!"});

    const existingUser = await User.findOne({where: {email: email?.toString()}});
    if(!existingUser) return res.render("error", {message: "User doesn't exist!"});

    const passwordCorrect = password === existingUser.password || await comparePassword(password, existingUser.password);

    if(!passwordCorrect) return res.render("error", {message: "Invalid password"});

    (req.session as any).user = existingUser.token;

    return res.redirect("/dashboard/uploads");
});

app.get("/auth/register", (req, res) => {
    return res.render("auth/register");
});

app.post("/auth/register", async (req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password) return res.render("error", {message: "You didn't provide a username or password!"});

    const existingUser = await User.findOne({where: {email}});

    if(existingUser) return res.render("error", {message: "User already exists!"});

    const hashedPassword = await hashPassword(password);
    if(!hashedPassword) return;

    const user = User.create({email, password: hashedPassword, token: randomUUID()}); 

    await user.save();

    (req.session as any).user = user.token;

    return res.redirect("/dashboard/uploads");
});

app.get("/", (req, res) => {
    return res.render("home");
});

app.get("/dashboard/uploads", isAuthenticated ,getUser, async (req: Request, res: Response) => {
    const fileTypes = await Upload.createQueryBuilder("upload").select("DISTINCT file_type").execute();

    res.render("dashboard/uploads", {fileTypes});
});

app.get("/dashboard/settings", isAuthenticated, getUser, (req, res) => {
    res.render("dashboard/settings");
});

app.get("/dashboard/collection/create/:name", isAuthenticated, getUser, async (req, res) => {
    const {name} = req.params;
    let user = await User.findOne({where: {token: req.session.user}, relations: {collections: {files: true}}});
    if(!user) return;

    const newCollection = Collection.create({name});

    await newCollection.save();

    user.collections.push(newCollection);
    await user.save();

    return res.sendStatus(200);
});

app.get("/:filename", (async (req, res) => {
    const {filename} = req.params;

    const file = await Upload.findOne({where: {file_name: filename}, relations: {author: true}});

    if(!file) return res.json({error: "File doesn't exist!"});

    const filePath = path.join(__dirname, "../uploads", file.file_id);

    res.setHeader("Content-Disposition", "attachment; filename=" + file.file_name);
    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Type", `${file.upload_type}/${file.file_type}`);

    return res.sendFile(filePath);
}));

app.post("/copy_website", isAuthenticated, getUser, async (req, res) => {
    const {url} = req.query;

    if(!url) return;
});

app.post("/upload", async (req, res) => {
    const key = req.query["key"] as string;

    if(!key) return res.json({error: "No key was provided!"});

    const user = await User.findOne({where: {token: key}, relations: {uploads: true}});

    if(!user) return res.json({error: "Invalid key!"});

    const file = (req.files as any)["file"];

    if(!file) return res.json({error: "No file provided"});

    const fileID = randomUUID();

    const splitMine = file.mimetype.split("/");

    await file.mv(path.join(__dirname, "../uploads", `${fileID}`));

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

    user.save();
    
    return res.json({
        status: 200,
        file: {
            url: `https://${req.hostname}/${file.name}`
        }
    });
});

app.listen(8006);