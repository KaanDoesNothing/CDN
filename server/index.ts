import {initDatabase} from "~/server/db/index";
import {storageClient} from "~/server/storage";

export default async () => {
    await initDatabase();
}