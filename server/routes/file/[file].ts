import {storageClient} from "~/server/storage";

export default defineEventHandler(async (e) => {
    if(e.req.method === "GET") {
        const file_name = e.context?.params?.file;
        const fetched = await storageClient.getObject("cdn", "c4080465-b36a-40ba-880b-4ef20617592a");

        return fetched.read();
    }
});

