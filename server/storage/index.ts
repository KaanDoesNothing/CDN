import { Client } from "minio";

const config = useRuntimeConfig();
export const storageClient = new Client({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey,
    useSSL: config.minio.ssl
});