module.exports = {
    apps: [
        {
            name: "CDN",
            exec_mode: "cluster",
            instances: "max",
            script: "./.output/server/index.mjs"
        }
    ]
}