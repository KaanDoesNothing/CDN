// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    // @ts-ignore
    runtimeConfig: {
        MONGODB: process.env.MONGODB,
        minio: {
            endPoint: process.env.MINIO_HOST,
            port: parseInt(process.env.MINIO_PORT as string),
            accessKey: (process.env.MINIO_ACCESS_KEY as string).toLowerCase(),
            secretKey: process.env.MINIO_SECRET_KEY,
            api: "s3v4",
            path: "auto",
            region: "dusseldorf",
            ssl: false
        },
        BASE: process.env.BASE
    },
    nitro: {
        plugins: ["~/server/index.ts"]
    }
})
