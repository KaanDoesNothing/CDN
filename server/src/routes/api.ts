import { randomUUID } from "crypto";
import express from "express";
import { Collection } from "../entities/collection";
import { User } from "../entities/user";
import { getUser, isAuthenticated } from "../middleware";
import { comparePassword, hashPassword } from "../utils";

export const api = express.Router();

api.get("/api/session", isAuthenticated, getUser, (req, res) => {
    res.json(res.locals.user);
});

api.post("/auth/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email) return res.json({error: "Provide an email!"});

    const existingUser = await User.findOne({where: {email: email?.toString()}});
    if(!existingUser) return res.json({error: "User doesn't exist!"});

    const passwordCorrect = password === existingUser.password || await comparePassword(password, existingUser.password);

    if(!passwordCorrect) return res.json({error: "Invalid password"});

    (req.session as any).user = existingUser.token;

    return res.json({success: "Hmm"});
});

api.post("/auth/register", async (req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password) return res.json({error: "You didn't provide a username or password!"});

    const existingUser = await User.findOne({where: {email}});

    if(existingUser) return res.json({error: "User already exists!"});

    const hashedPassword = await hashPassword(password);
    if(!hashedPassword) return;

    const user = User.create({email, password: hashedPassword, token: randomUUID()}); 

    await user.save();

    (req.session as any).user = user.token;

    return res.json({success: "Hmm"});
});

api.post("/dashboard/collections/create", isAuthenticated, getUser, async (req, res) => {
    const {name} = req.body;
    
    let user = await User.findOne({where: {token: req.session.user}, relations: {collections: {files: true}}});
    if(!user) return;

    const newCollection = Collection.create({name});

    await newCollection.save();

    user.collections.push(newCollection);
    await user.save();

    return res.json({success: "Collection has been created!"});
});