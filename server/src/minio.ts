import {Client} from "minio";
import { getConfig } from "./utils";

const config = getConfig();

export const minioClient = new Client({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey,
    useSSL: config.minio.ssl
});