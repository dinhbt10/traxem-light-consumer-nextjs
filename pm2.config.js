module.exports = {
    apps: [
        {
            name: "traxemlight-app",
            script: "./server.js",
            watch: true,
            env: {
                HOSTNAME: "0.0.0.0",
                PORT: "3000"
            }
        }
    ]
};
