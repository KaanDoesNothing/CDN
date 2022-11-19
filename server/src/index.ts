import { formatBytes } from "./utils";
import express from "express";
import expressFileUpload from "express-fileupload";
import expressSession from "express-session";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(__dirname, "../uploads");

fs.mkdirSync(uploadsDir, {recursive: true});

import {db} from "./db";
import { defaultParams } from "./middleware";
import { api } from "./routes/api";
import { main } from "./routes/main";

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
    createParentPath: true,
    limits: {fileSize: 50 * 1024 * 1024 * 1024},
}));

app.use(defaultParams);

app.use(api);
app.use(main);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(8006);