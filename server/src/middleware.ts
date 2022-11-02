import { NextFunction, Request, Response } from "express";
import { Upload } from "./entities/upload";
import { User } from "./entities/user";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user) return res.json({error: "You are not authenticated"});

    next();
}

export const defaultParams = (req: Request, res: Response, next: NextFunction) => {
    res.locals.authenticated = req.session.user;

    next();
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const {file_type, file_name} = req.query;

    let user = await User.findOne({where: {token: req.session.user, collections: {author: {token: req.session.user}}}, relations: {collections: {files: true}}});

    if(user) {
        if(file_type) {
            user.uploads = await Upload.find({where: {author: {email: user.email}, file_type: file_type as string}, order: {created: "DESC"}});
        }else {
            user.uploads = await Upload.find({where: {author: {email: user.email}}, order: {created: "DESC"}});

            if(file_name) {
                user.uploads = user.uploads.filter(row => row.file_name.toLowerCase().includes((file_name as string).toLocaleLowerCase()));
            }
        }

        res.locals.user = user;
    }

    next();
}