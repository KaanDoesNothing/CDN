import { NextFunction, Request, Response } from "express";
import { User } from "./entities/user";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user) return res.redirect("/auth/login");

    next();
}

export const defaultParams = (req: Request, res: Response, next: NextFunction) => {
    res.locals.authenticated = req.session.user;

    next();
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const {file_type, file_name} = req.query;
    let searchQuery: any = {
        where: {
            token: req.session.user
        }
    }

    if(file_type) {
        searchQuery = {
            where: {
                token: req.session.user,
                uploads: {file_type}
            }
        }
    }
    // }else if(file_name) {
    //     searchQuery = {
    //         where: {
    //             token: req.session,
    //             uploads: {file_name}
    //         }
    //     }
    // }
    const user = await User.findOne({...searchQuery, relations: {uploads: true}, order: {uploads: {created: "DESC"}}});

    res.locals.user = user;

    next();
}