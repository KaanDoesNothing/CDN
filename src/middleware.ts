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
    const user = await User.findOne({where: {token: req.session.user}, relations: {uploads: true}, order: {uploads: {created: "DESC"}}});

    res.locals.user = user;

    next();
}