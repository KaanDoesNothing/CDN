module.exports = {
    apps: [
        {
            name: "CDN",
            exec_mode: "cluster",
            instances: "max",
            port: 8006,
            script: "./.output/server/index.mjs"
        }
    ]
}