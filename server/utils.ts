// @ts-ignore
import bcrypt from "bcrypt";
import {DB_File, DB_Collection} from "~/server/db";
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

export const transformCollection = async (collection: any) => {
    collection.files = await Promise.all(collection.files.map((file: string) => DB_File.findOne({file_id: file})));

    return collection;
}