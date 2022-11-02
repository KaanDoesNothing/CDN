import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string, saltRounds = 10): Promise<null | string> => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const comparePassword = async (password: string, hash: string) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.log(error);
    }

    return false;
};

export const getConfig = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../config.json"), "utf-8");

    return JSON.parse(raw);
}

export const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}